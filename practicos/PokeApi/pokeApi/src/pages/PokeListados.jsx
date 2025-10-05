import { useState, useEffect } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";

const PokeListados = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pokemons, setPokemons] = useState([]);
  const [abilities, setAbilities] = useState([]);

  const [visible, setVisible] = useState(false);
  const [detalle, setDetalle] = useState(null);


  useEffect(() => {
    const storedPokemons = localStorage.getItem("pokemons");
    const storedAbilities = localStorage.getItem("abilities");

    if (storedPokemons && storedAbilities) {
      setPokemons(JSON.parse(storedPokemons));
      setAbilities(JSON.parse(storedAbilities));
    }
  }, []);

  const cargarDatos = async () => {
    setLoading(true);
    setError(null);

    try {
      const [resPoke, resHabs] = await Promise.all([
        fetch("https://pokeapi.co/api/v2/pokemon?limit=50"),
        fetch("https://pokeapi.co/api/v2/ability?limit=50"),
      ]);

      if (!resPoke.ok || !resHabs.ok)
        throw new Error("Error al obtener los datos");

      const dataPoke = await resPoke.json();
      const dataHabs = await resHabs.json();

      const pokes = dataPoke.results.map((p, i) => ({
        index: i + 1,
        name: p.name,
        url: p.url,
        id: p.url.split("/").filter(Boolean).pop(),
      }));

      const habs = dataHabs.results.map((h, i) => ({
        index: i + 1,
        name: h.name,
        url: h.url,
        id: h.url.split("/").filter(Boolean).pop(),
      }));

      // localStorage
      localStorage.setItem("pokemons", JSON.stringify(pokes));
      localStorage.setItem("abilities", JSON.stringify(habs));

      // estado
      setPokemons(pokes);
      setAbilities(habs);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
   
  const recargar = () => {
    localStorage.removeItem("pokemons");
    localStorage.removeItem("abilities");
    cargarDatos();
  };

  // detalles de un pokemon
  const verDetalle = async (pokemon) => {
    setLoading(true);
    try {
      const res = await fetch(pokemon.url);
      if (!res.ok) throw new Error("Error al obtener detalles del Pokémon");
      const data = await res.json();

      setDetalle({
        tipo: "pokemon",
        name: data.name,
        height: data.height,
        weight: data.weight,
        types: data.types.map((t) => t.type.name).join(", "),
        sprite: data.sprites.front_default,
      });

      setVisible(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // detalles de una habilidad
  const verDetalleHabilidad = async (habilidad) => {
    setLoading(true);
    try {
      const res = await fetch(habilidad.url);
      if (!res.ok) throw new Error("Error al obtener detalles de la habilidad");
      const data = await res.json();

      setDetalle({
        tipo: "habilidad",
        name: data.name,
        effect:
          data.effect_entries.find((e) => e.language.name === "es")?.effect || 
          data.effect_entries.find((e) => e.language.name === "en")?.effect ||
          "Sin descripción disponible",
      });

      setVisible(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card style={{ backgroundColor: '#1b1b1b', color: 'white', width: '100%'}}>
       <h1 style={{ display: 'flex', justifyContent: 'center'}}>Listado Pokémon y Habilidades</h1>
        <div style={{ display: "flex", gap: "10px", marginBottom: "10px",justifyContent: 'center'}}>
          <Button label="Cargar datos" onClick={cargarDatos} />
          <Button label="Recargar" onClick={cargarDatos} severity="secondary" />
        </div>

        {loading && (
          <div style={{ textAlign: "center", margin: "1rem" }}>
            <i className="pi pi-spin pi-spinner" style={{ fontSize: "2rem" }}></i>
            <p>Cargando datos...</p>
          </div>
        )}

        {error && <p style={{ color: "red" }}>Error: {error}</p>}

        <article className="contenedor-tablas" style={{ display: 'flex', justifyContent: 'space-around' }}>
          {/* tabla de pokemons */}
          <section className="tabla-pokemons">
          <h3 style={{display:'flex', justifyContent: 'center'}}>Pokemon</h3>
          <DataTable
            value={pokemons}
            emptyMessage="No hay datos"
            onRowClick={(e) => verDetalle(e.data)}
            rowHover
          >
            <Column field="id" header="ID" style={{ width: "4rem" }} />
            <Column field="name" header="Nombre" />
          </DataTable>
          </section>

          <section className="tabla-habilidades">
          {/* tabla habilidades */}
          <h3 style={{display:'flex', justifyContent: 'center'}}>Habilidades</h3>
          <DataTable
            value={abilities}
            emptyMessage="No hay datos"
            onRowClick={(e) => verDetalleHabilidad(e.data)}
            rowHover
          >
            <Column field="id" header="ID" style={{ width: "4rem" }} />
            <Column field="name" header="Nombre" />
          </DataTable>
          </section>
        </article>
        {/* Dialog Detalle */}
        <Dialog
          header={detalle?.name}
          visible={visible}
          style={{ width: "350px" }}
          modal
          onHide={() => setVisible(false)}
        >
          {detalle && detalle.tipo === "pokemon" && (
            <div style={{ textAlign: "justify", lineHeight: 1.4 }}>
              {detalle.sprite && (
                <img
                  src={detalle.sprite}
                  alt={detalle.name}
                  width="120"
                  height="120"
                />
              )}
              <p><strong>Altura:</strong> {detalle.height}</p>
              <p><strong>Peso:</strong> {detalle.weight}</p>
              <p><strong>Tipos:</strong> {detalle.types}</p>
            </div>
          )}

          {detalle && detalle.tipo === "habilidad" && (
            <div style={{ textAlign: "justify", lineHeight: 1.4 }}>
              <p><strong>Efecto:</strong></p>
              <p>{detalle.effect}</p>
            </div>
          )}
        </Dialog>
      </Card>
    
  );
};

export default PokeListados;
