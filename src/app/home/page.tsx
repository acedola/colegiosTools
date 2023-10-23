'use client';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

async function fetchData() {
  try {
    const response = await fetch('http://localhost:3000/api/colegios');
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return response.json();
  } catch (error) {
    throw error;
  }
}

function HomePage() {
  const router = useRouter();
  const [entidades, setEntidades] = useState(null);
  const [nombre, setNombre] = useState(null);

  useEffect(() => {
    fetchData()
      .then((data) => {
        setEntidades(data.entidades), setNombre(data.nombre);
      })
      .catch((error) => console.error('Error:', error));
  }, []);

  return (
    <>
      <div className=" w-full bg-zinc-950   top-0 shadow-xl p-10 ">
        <div className="flex flex-col items-center space-y-4">
          <h1 className="font-bold text-2xl text-gray-300 w-4/6 text-center">
            Seleccionar un Colegio para acceder a las herramientas
          </h1>
          <p className="text-sm text-gray-300 text-center w-5/6">
            Selecione uno de los Colegios para acceder al conjunto de
            herramientas adminsitrativas.
          </p>
        </div>
      </div>
      <div className="grid grid-rows-4 mt-5 grid-flow-col items-center justify-center bg-white gap-4 w-1/2">
        {entidades &&
          entidades.map((entidad, index) => (
            <div key={index} className="space-y-2 font-medium">
              <div className="ml-7 p-3 ">
                <button
                  type="submit"
                  className="bg-white w-60 text-gray-800 rounded-md font-semibold px-4 py-3 border-2 border-black  hover:bg-zinc-900 hover:text-white"
                  onClick={() => router.push('/toolsList')}
                >
                  {entidad.entidad}
                </button>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
export default HomePage;
