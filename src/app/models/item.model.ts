export interface Item {
  id?: string;    // Identificador de documento
  nombre: string;
  descripcion: string;
  imagenUrl: string;
  tipo: 'animal' | 'planta';
  fechaCreacion?: number;
  vecesElegido?: number; // Para pantalla principal

}
