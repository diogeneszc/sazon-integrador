import { guardarStorage, obtenerStorage, eliminarStorage } from '../assets/js/local-storage.js';
import { buscarUsuarioPorEmail, registrarNuevoUsuario } from '../assets/js/usuarios-db.js';

export const CLAVE_SESION = 'sazon_sesion_activa';
export const CLAVE_RECORDAR = 'sazon_remember_email';

export function iniciarSesion(email, password, recordar = false) {
  const correoLimpio = (email || '').trim().toLowerCase();
  const claveLimpia = (password || '').trim();

  if (!correoLimpio || !claveLimpia) {
    return { ok: false, mensaje: 'Por favor ingresa tu correo y contraseña.' };
  }

  const usuario = buscarUsuarioPorEmail(correoLimpio);
  if (!usuario) {
    return { ok: false, mensaje: 'El correo electrónico no se encuentra registrado.' };
  }

  if (usuario.password !== claveLimpia) {
    return { ok: false, mensaje: 'Contraseña incorrecta. Verifica tus datos.' };
  }

  const sesion = {
    id: usuario.id,
    nombre: usuario.nombre,
    email: usuario.email,
    rol: usuario.rol,
    avatar: usuario.avatar,
    fechaLogin: new Date().toISOString()
  };

  guardarStorage(CLAVE_SESION, sesion);

  if (recordar) {
    guardarStorage(CLAVE_RECORDAR, correoLimpio);
  } else {
    eliminarStorage(CLAVE_RECORDAR);
  }

  return { ok: true, usuario: sesion, mensaje: '¡Bienvenido a Sa·zón!' };
}

export function registrarUsuario({ nombre, email, password, passwordConfirm, terminos }) {
  const nombreLimpio = (nombre || '').trim();
  const correoLimpio = (email || '').trim().toLowerCase();
  const claveLimpia = (password || '').trim();
  const confirmarLimpia = (passwordConfirm || '').trim();

  if (!nombreLimpio || !correoLimpio || !claveLimpia || !confirmarLimpia) {
    return { ok: false, mensaje: 'Todos los campos son obligatorios.' };
  }

  if (!terminos) {
    return { ok: false, mensaje: 'Debes aceptar los Términos y la Política de Datos.' };
  }

  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regexEmail.test(correoLimpio)) {
    return { ok: false, mensaje: 'El formato de correo electrónico no es válido.' };
  }

  if (claveLimpia.length < 6) {
    return { ok: false, mensaje: 'La contraseña debe tener mínimo 6 caracteres.' };
  }

  if (claveLimpia !== confirmarLimpia) {
    return { ok: false, mensaje: 'Las contraseñas no coinciden.' };
  }

  const existente = buscarUsuarioPorEmail(correoLimpio);
  if (existente) {
    return { ok: false, mensaje: 'Este correo electrónico ya se encuentra registrado.' };
  }

  const nuevoUsuario = registrarNuevoUsuario({
    nombre: nombreLimpio,
    email: correoLimpio,
    password: claveLimpia
  });

  guardarStorage(CLAVE_RECORDAR, correoLimpio);

  return {
    ok: true,
    usuario: nuevoUsuario,
    mensaje: 'Cuenta creada con éxito. Redirigiendo...'
  };
}

export function obtenerSesionActiva() {
  return obtenerStorage(CLAVE_SESION);
}

export function cerrarSesion() {
  eliminarStorage(CLAVE_SESION);
}

export function obtenerEmailRecordado() {
  return obtenerStorage(CLAVE_RECORDAR);
}

function mostrarAlerta(elementoId, mensaje, tipo = 'error') {
  const el = document.getElementById(elementoId);
  if (!el) return;

  el.textContent = mensaje;
  el.classList.remove('hidden', 'bg-red-50', 'text-red-700', 'border-red-200', 'dark:bg-red-950/40', 'dark:text-red-300', 'dark:border-red-900/60', 'bg-emerald-50', 'text-emerald-800', 'border-emerald-200', 'dark:bg-emerald-950/40', 'dark:text-emerald-300', 'dark:border-emerald-900/60');

  if (tipo === 'success') {
    el.classList.add('bg-emerald-50', 'text-emerald-800', 'border', 'border-emerald-200', 'dark:bg-emerald-950/40', 'dark:text-emerald-300', 'dark:border-emerald-900/60');
  } else {
    el.classList.add('bg-red-50', 'text-red-700', 'border', 'border-red-200', 'dark:bg-red-950/40', 'dark:text-red-300', 'dark:border-red-900/60');
  }
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
      const inputEmail = document.getElementById('login-email');
      const inputPass = document.getElementById('login-password');
      const checkRemember = document.getElementById('remember-me');

      const emailGuardado = obtenerEmailRecordado();
      if (emailGuardado && inputEmail) {
        inputEmail.value = emailGuardado;
        if (checkRemember) checkRemember.checked = true;
      }

      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const resultado = iniciarSesion(
          inputEmail ? inputEmail.value : '',
          inputPass ? inputPass.value : '',
          checkRemember ? checkRemember.checked : false
        );

        if (!resultado.ok) {
          mostrarAlerta('login-alert', resultado.mensaje, 'error');
        } else {
          mostrarAlerta('login-alert', resultado.mensaje, 'success');
          setTimeout(() => {
            window.location.href = '../../landing.html';
          }, 800);
        }
      });
    }

    const registerForm = document.getElementById('register-form');
    if (registerForm) {
      const inputName = document.getElementById('register-name');
      const inputEmail = document.getElementById('register-email');
      const inputPass = document.getElementById('register-password');
      const inputPassConfirm = document.getElementById('register-password-confirm');
      const checkTerms = document.getElementById('register-terms');

      registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const resultado = registrarUsuario({
          nombre: inputName ? inputName.value : '',
          email: inputEmail ? inputEmail.value : '',
          password: inputPass ? inputPass.value : '',
          passwordConfirm: inputPassConfirm ? inputPassConfirm.value : '',
          terminos: checkTerms ? checkTerms.checked : false
        });

        if (!resultado.ok) {
          mostrarAlerta('register-alert', resultado.mensaje, 'error');
        } else {
          mostrarAlerta('register-alert', resultado.mensaje, 'success');
          setTimeout(() => {
            window.location.href = './login.html';
          }, 1200);
        }
      });
    }
  });
}
