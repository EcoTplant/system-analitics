// 📁 logger-cli/src/app.js
const os = require('os');
const readline = require('readline');

// Configuración de readline para entrada interactiva
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Función de la Práctica 1
function ejecutarPruebasSistema() {
  console.log("\n=== Inicio del sistema ===");
  console.time("ProcesoPrincipal");

  function accesoUsuario(usuario) {
    console.count(`Acceso de usuario ${usuario}`);
  }

  accesoUsuario('Carlos');
  accesoUsuario('Ana');
  accesoUsuario('Carlos');

  console.warn("Capacidad de usuarios alcanzando el límite");
  console.error("Error: No se pudo conectar a la base de datos");

  const usuarios = [
    { nombre: "Carlos", rol: "Admin" },
    { nombre: "Ana", rol: "User" }
  ];

  console.table(usuarios);
  console.timeEnd("ProcesoPrincipal");
  console.log("=== Fin del sistema ===\n");
}

// Función de la Práctica 3
function mostrarInformacionSistema() {
  console.clear();
  console.log('🖥️  Monitor de Sistema');
  console.log('========================');
  console.log(`Sistema: ${os.platform()} (${os.arch()})`);
  console.log(`CPU: ${os.cpus()[0].model}`);
  console.log(`Cores: ${os.cpus().length}`);
  console.log(`Memoria Libre: ${(os.freemem() / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`Memoria Total: ${(os.totalmem() / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`Uptime: ${(os.uptime() / 60).toFixed(2)} minutos`);
  console.log(`Usuario: ${os.userInfo().username}`);
  console.log('========================\n');
}

// Función principal de la CLI (Práctica 2 extendida)
function iniciarCLI() {
  console.log('Bienvenido a System Analytics CLI');
  console.log('Comandos disponibles:');
  console.log('  hola     - Saludo interactivo');
  console.log('  tiempo   - Muestra uptime del proceso');
  console.log('  sistema  - Muestra información del sistema');
  console.log('  test     - Ejecuta pruebas del sistema');
  console.log('  salir    - Termina la aplicación\n');

  rl.setPrompt('Ingresa un comando: ');
  rl.prompt();

  rl.on('line', (input) => {
    const comando = input.trim().toLowerCase();

    switch (comando) {
      case 'hola':
        console.log('¡Hola! ¿Cómo estás?\n');
        break;
      case 'tiempo':
        console.log(`Tiempo activo: ${process.uptime().toFixed(2)} segundos\n`);
        break;
      case 'sistema':
        mostrarInformacionSistema();
        break;
      case 'test':
        ejecutarPruebasSistema();
        break;
      case 'salir':
        console.log('Saliendo...');
        rl.close();
        return;
      default:
        console.log('Comando no reconocido. Usa: hola, tiempo, sistema, test, salir\n');
    }

    rl.prompt();
  }).on('close', () => {
    process.exit(0);
  });
}

// Ejecutar la aplicación
iniciarCLI();