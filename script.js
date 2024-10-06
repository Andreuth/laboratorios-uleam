// Simulación de usuarios y reservas
let users = [
    { username: 'admin', password: 'admin123', role: 'administrador' },
    { username: 'docente', password: 'docente123', role: 'docente' },
    { username: 'estudiante', password: 'estudiante123', role: 'estudiante' },
];

// Arreglos para almacenar reservas y prácticas
let reservations = [];
let practices = [];

// Iniciar sesión
document.getElementById('login-form')?.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        alert('Bienvenido ' + user.username);
        localStorage.setItem('user', JSON.stringify(user)); // Guardar usuario en localStorage
        window.location.href = 'dashboard.html'; // Redirigir al panel principal
    } else {
        alert('Credenciales incorrectas. Intente nuevamente.');
    }
});

// Recuperar contraseña (simulación)
function recoverPassword() {
    alert('Función de recuperación de contraseña no implementada.');
}

// Cerrar sesión
function logout() {
    localStorage.removeItem('user'); // Eliminar usuario del localStorage
    window.location.href = 'index.html'; // Regresar a inicio de sesión
}

// Cargar rol del usuario en el dashboard
window.onload = function() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        document.getElementById('user-role').innerText = 'Rol: ' + user.role;

        // Mostrar u ocultar botones según el rol del usuario
        if (user.role === 'docente') {
            document.getElementById('book-lab-btn').style.display = 'inline';
            document.getElementById('manage-practices-btn').style.display = 'inline';
        } else if (user.role === 'administrador') {
            document.getElementById('create-user-btn').style.display = 'inline';
        }
    } else {
        window.location.href = 'index.html'; // Redirigir si no está autenticado
    }
}

// Funciones para navegar a las secciones correspondientes
function goToLabReservations() {
    window.location.href = 'reservas.html';
}

function goToManagePractices() {
    window.location.href = 'practicas.html';
}

function goToDashboard() {
    window.location.href = 'dashboard.html';
}

// Función para mostrar/ocultar el formulario de creación de usuarios
function toggleCreateUserForm() {
    const form = document.getElementById('create-user-form');
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
}

// Función para crear un nuevo usuario
function createUser() {
    const newUsername = document.getElementById('new-username').value;
    const newPassword = document.getElementById('new-password').value;
    const newRole = document.getElementById('new-role').value;

    // Verificar si el nombre de usuario ya existe
    const existingUser = users.find(u => u.username === newUsername);
    if (existingUser) {
        alert('El nombre de usuario ya existe. Intente con otro.');
        return;
    }

    // Agregar el nuevo usuario a la lista
    users.push({ username: newUsername, password: newPassword, role: newRole });
    alert('Usuario creado exitosamente.');

    // Limpiar los campos del formulario
    document.getElementById('new-username').value = '';
    document.getElementById('new-password').value = '';
    document.getElementById('new-role').value = 'administrador';

    // Ocultar el formulario
    toggleCreateUserForm();
}

// Funciones para manejar reservas de laboratorio
document.getElementById('reservation-form')?.addEventListener('submit', function(event) {
    event.preventDefault();

    const labName = document.getElementById('lab-name').value;
    const reservationDate = document.getElementById('reservation-date').value;
    const startTime = document.getElementById('start-time').value;
    const endTime = document.getElementById('end-time').value;

    const reservation = {
        labName,
        reservationDate,
        startTime,
        endTime
    };

    // Agregar reserva y mostrar en la lista
    reservations.push(reservation);
    displayReservations();

    // Limpiar el formulario
    document.getElementById('reservation-form').reset();
});

// Función para mostrar las reservas
function displayReservations() {
    const reservationsList = document.getElementById('reservations');
    reservationsList.innerHTML = '';

    reservations.forEach(reservation => {
        const li = document.createElement('li');
        li.textContent = `Laboratorio: ${reservation.labName}, Fecha: ${reservation.reservationDate}, Hora: ${reservation.startTime} - ${reservation.endTime}`;
        reservationsList.appendChild(li);
    });
}

// Funciones para manejar prácticas y proyectos
document.getElementById('practice-form')?.addEventListener('submit', function(event) {
    event.preventDefault();

    const practiceName = document.getElementById('practice-name').value;
    const studentName = document.getElementById('student-name').value;

    const practice = {
        practiceName,
        studentName
    };

    // Agregar práctica y mostrar en la lista
    practices.push(practice);
    displayPractices();

    // Limpiar el formulario
    document.getElementById('practice-form').reset();
});

// Función para mostrar las prácticas
function displayPractices() {
    const practicesList = document.getElementById('practices');
    practicesList.innerHTML = '';

    practices.forEach(practice => {
        const li = document.createElement('li');
        li.textContent = `Práctica: ${practice.practiceName}, Estudiante: ${practice.studentName}`;
        practicesList.appendChild(li);
    });
}
