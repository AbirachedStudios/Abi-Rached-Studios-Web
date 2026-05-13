import React, { useState } from 'react';
import { Mail, Lock, LogIn, Eye, EyeOff } from 'lucide-react'; 
import axios from 'axios';
import { useRouter } from 'next/navigation'; // Agregamos el router de Next.js

const API_URL = 'http://localhost:3001/api/auth/login'; 

const Login = ({ switchToRegister, switchToContact }) => {
    const router = useRouter(); // Inicializamos el router
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!passwordRegex.test(password)) {
            setError('La contraseña debe tener al menos una mayúscula, una minúscula, un número y un símbolo, y mínimo 8 caracteres.');
            return;
        }

        setIsLoading(true);

        try {
            const response = await axios.post(API_URL, {
                email: email,
                password: password,
            });

            const result = response.data; // Aquí recibimos { token, user }
            
            setSuccess('¡Inicio de sesión exitoso!');
            
            // --- NUEVA LÓGICA DE PERSISTENCIA ---
            localStorage.setItem('token', result.token);
            localStorage.setItem('user', JSON.stringify(result.user));

            // Limpiamos campos
            setEmail('');
            setPassword('');

            // --- REDIRECCIÓN SEGÚN ROL ---
            // Usamos un pequeño delay para que el usuario vea el mensaje de éxito
            setTimeout(() => {
                if (result.user.role === 'ADMIN') {
                    router.push('/admin'); // Va a la carpeta src/app/admin/page.js
                } else {
                    router.push('/'); // Vuelve a la landing
                }
            }, 1500);

        } catch (error) {
            if (error.response) {
                setError(error.response.data.message || 'Error de inicio de sesión.');
            } else if (error.request) {
                setError('No se recibió respuesta del servidor.');
            } else {
                setError('Ocurrió un error inesperado.');
            }
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className="w-full max-w-md bg-gray-900 p-8 rounded-xl shadow-2xl transition-all duration-300 border border-gray-700">
            
            {/* Encabezado */}
            <h2 className="text-3xl font-extrabold text-oro text-center mb-2">
                Iniciar Sesión
            </h2>
            <p className="text-center text-sm text-gray-400 mb-8">
                Accede a tu cuenta de Abi Rached Studios
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Campo de Email */}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white">
                        Correo Electrónico
                    </label>
                    <div className="mt-1 relative rounded-lg shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-purpura" aria-hidden="true" />
                        </div>
                        <input
                            type="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="ejemplo@dominio.com"
                            className="appearance-none block w-full pl-10 pr-3 py-2 bg-gray-700 border-2 border-purpura rounded-lg placeholder-gray-500 focus:outline-none focus-purpura text-white sm:text-sm transition duration-150 ease-in-out"
                            disabled={isLoading}
                        />
                    </div>
                </div>

                {/* Campo de Contraseña */}
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-white">
                        Contraseña
                    </label>
                    <div className="mt-1 relative rounded-lg shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-purpura" aria-hidden="true" />
                        </div>
                        <input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            autoComplete="current-password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="appearance-none block w-full pl-10 pr-10 py-2 bg-gray-700 border-2 border-purpura rounded-lg placeholder-gray-500 focus:outline-none focus-purpura text-white sm:text-sm transition duration-150 ease-in-out"
                            disabled={isLoading}
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-purpura focus:outline-none"
                            tabIndex={-1}
                            onClick={() => setShowPassword((prev) => !prev)}
                        >
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                    </div>
                </div>

                {/* Manejo de Error y Éxito */}
                {error && (
                    <p className="text-sm text-red-400 bg-red-900 p-3 rounded-lg border border-red-700">
                        {error}
                    </p>
                )}
                {success && (
                    <p className="text-sm text-green-400 bg-green-900 p-3 rounded-lg border border-green-700">
                        {success}
                    </p>
                )}

                {/* Botón de Envío */}
                <div>
                    <button
                        type="submit"
                        className={`w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-lg shadow-lg text-sm font-medium text-gray-900 transition duration-300 ease-in-out 
                            ${isLoading 
                                ? 'bg-oro-light cursor-not-allowed' 
                                : 'bg-oro hover:bg-oro-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-oro hover:scale-[1.01] focus:ring-offset-gray-900'
                            }`}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : (
                            <LogIn className="h-5 w-5 mr-2" aria-hidden="true" />
                        )}
                        {isLoading ? 'Iniciando Sesión...' : 'Entrar'}
                    </button>
                </div>

                {/* Enlace de registro y contacto */}
                <div className="mt-4 pt-4 border-t border-gray-700 space-y-2">
                    <p className='text-gray-400 text-center text-sm'>
                        ¿No tienes cuenta?{' '}
                        <button 
                        type="button" 
                        onClick={switchToRegister} 
                        className="font-medium text-oro hover:text-oro-light underline transition-colors"
                        >
                        Regístrate aquí
                        </button>
                    </p>
                    <p className='text-gray-500 text-center text-xs'>
                        ¿Problemas?{' '}
                        <button 
                        type="button" 
                        onClick={switchToContact} 
                        className="font-medium text-purpura hover:text-oro-light underline transition-colors"
                        >
                        Contáctanos
                        </button>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Login;