import { guardarStorage, obtenerStorage } from './local-storage.js';

export const CLAVE_USUARIOS = 'sazon_usuarios';

export const usuariosBase = [
  {
    id: 1,
    nombre: 'Carlos Restrepo',
    email: 'admin@nutresa.com',
    password: 'admin2026',
    rol: 'administrador',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&h=256&q=80',
    biografia: 'Administrador del sistema Sa·zón Ecosistema Nutresa.',
    estado: 'activo'
  },
  {
    id: 2,
    nombre: 'Laura Gómez',
    email: 'laura.admin@nutresa.com',
    password: 'admin2026',
    rol: 'administrador',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&h=256&q=80',
    biografia: 'Administradora de operaciones digitales y gestión de productos Nutresa.',
    estado: 'activo'
  },
  {
    id: 3,
    nombre: 'Mariana Morales',
    email: 'mariana@nutresa.com',
    password: 'sazon2026',
    rol: 'creador de contenido',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80',
    biografia: 'Chef entusiasta y creadora de recetas para la comunidad Sa·zón. Comprometida con la nutrición balanceada y la creatividad culinaria con marcas Grupo Nutresa.',
    estado: 'activo'
  },
  {
    id: 4,
    nombre: 'Alejandro Vélez',
    email: 'alejo.cocina@nutresa.com',
    password: 'sazon2026',
    rol: 'creador de contenido',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=256&h=256&q=80',
    biografia: 'Especialista en parrilla y cocina tradicional colombiana con Zenú y Pietrán.',
    estado: 'activo'
  },
  {
    id: 5,
    nombre: 'Camila Duarte',
    email: 'camila.recetas@nutresa.com',
    password: 'sazon2026',
    rol: 'creador de contenido',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&h=256&q=80',
    biografia: 'Repostera y creadora de contenido dulce con Chocolates Jet y Galletas Noel.',
    estado: 'activo'
  }
];

export function inicializarUsuarios() {
  const usuariosExistentes = obtenerStorage(CLAVE_USUARIOS);
  if (!usuariosExistentes || !Array.isArray(usuariosExistentes) || usuariosExistentes.length === 0) {
    guardarStorage(CLAVE_USUARIOS, usuariosBase);
    return usuariosBase;
  }

  let actualizado = false;
  usuariosBase.forEach(baseUser => {
    const existing = usuariosExistentes.find(u => u.id === baseUser.id || u.email === baseUser.email);
    if (existing) {
      if (existing.avatar !== baseUser.avatar) {
        existing.avatar = baseUser.avatar;
        actualizado = true;
      }
      if (typeof existing.biografia === 'undefined') {
        existing.biografia = baseUser.biografia;
        actualizado = true;
      }
    }
  });

  if (actualizado) {
    guardarStorage(CLAVE_USUARIOS, usuariosExistentes);
  }

  return usuariosExistentes;
}

export function obtenerUsuarios() {
  const usuarios = obtenerStorage(CLAVE_USUARIOS);
  return Array.isArray(usuarios) ? usuarios : inicializarUsuarios();
}

export function buscarUsuarioPorEmail(email) {
  const usuarios = obtenerUsuarios();
  return usuarios.find(u => u.email.toLowerCase() === email.toLowerCase().trim()) || null;
}

export function registrarNuevoUsuario(usuario) {
  const usuarios = obtenerUsuarios();
  const idNuevo = usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) + 1 : 1;
  const nuevo = {
    id: idNuevo,
    nombre: usuario.nombre.trim(),
    email: usuario.email.toLowerCase().trim(),
    password: usuario.password,
    rol: 'creador de contenido',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=256&h=256&q=80',
    biografia: '',
    estado: 'activo',
    fechaRegistro: new Date().toISOString()
  };

  usuarios.push(nuevo);
  guardarStorage(CLAVE_USUARIOS, usuarios);
  return nuevo;
}

if (typeof window !== 'undefined') {
  window.usuariosBase = usuariosBase;
  window.inicializarUsuarios = inicializarUsuarios;
  window.obtenerUsuarios = obtenerUsuarios;
  window.buscarUsuarioPorEmail = buscarUsuarioPorEmail;
  window.registrarNuevoUsuario = registrarNuevoUsuario;
}

if (typeof localStorage !== 'undefined') {
  inicializarUsuarios();
}
