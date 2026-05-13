import React, { useState } from 'react';
import { User, Mail, Lock, CheckSquare, Zap, Eye, EyeOff } from 'lucide-react'; 
import axios from 'axios';

const API_URL_REGISTER = 'http://localhost:3001/api/auth/register'; 

const Register = ({ switchToLogin, switchToContact }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;
  
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
        setSuccess('');
    };
  
    const handleSubmit = async (e) => {
        e.preventDefault();
  
        const { name, email, password, confirmPassword } = formData;
  
        if (!name || !email || !password || !confirmPassword) {
            return setError('Todos los campos son obligatorios.');
        }
  
        if (password !== confirmPassword) {
            return setError('Las contraseñas no coinciden.');
        }

        if (!passwordRegex.test(password)) {
            return setError('La contraseña debe tener al menos una mayúscula, una minúscula, un número y un símbolo, y mínimo 8 caracteres.');
        }
  
        setIsLoading(true);
  
        try {
            const response = await axios.post(API_URL_REGISTER, {
                name,
                email,
                password,
                confirmPassword
            });
  
            const result = response.data;
            setSuccess(result.message || '¡Registro exitoso! Ahora puedes iniciar sesión.');
            setError('');
            // Opcional: limpiar el formulario después del éxito
            setFormData({
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
            });
            setTimeout(switchToLogin, 2000); 
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message || 'Error de registro. Por favor, intenta nuevamente.');
            } else if (error.request) {
                console.error('Error de solicitud:', error.request);
                setError('No se recibió respuesta del servidor. Por favor, inténtalo de nuevo más tarde.');
            } else {
                console.error('Error:', error.message);
                setError('Ocurrió un error al registrar. Por favor, inténtalo de nuevo.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-lg bg-gray-900 p-8 rounded-xl shadow-2xl transition-all duration-300 border border-gray-700">
            
            {/* Encabezado */}
            <h2 className="text-3xl font-extrabold text-oro text-center mb-2">
                Crear una Cuenta
            </h2>
            <p className="text-center text-sm text-gray-400 mb-8">
                Únete a Abi Rached Studios y accede a todo el contenido.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Campo de Nombre */}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-white">
                        Nombre Completo
                    </label>
                    <div className="mt-1 relative rounded-lg shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-purpura" aria-hidden="true" />
                        </div>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            autoComplete="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Ej. Juan Pérez"
                            className="appearance-none block w-full pl-10 pr-3 py-2 bg-gray-700 border-2 border-purpura rounded-lg placeholder-gray-500 focus:outline-none focus-purpura text-white sm:text-sm transition duration-150 ease-in-out"
                            disabled={isLoading}
                        />
                    </div>
                </div>
                
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
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
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
                            autoComplete="new-password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Mínimo 8 caracteres, mayúscula, minúscula, número y símbolo"
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
                
                {/* Campo de Confirmar Contraseña */}
                <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-white">
                        Confirmar Contraseña
                    </label>
                    <div className="mt-1 relative rounded-lg shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <CheckSquare className="h-5 w-5 text-purpura" aria-hidden="true" />
                        </div>
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            autoComplete="new-password"
                            required
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Repite tu contraseña"
                            className="appearance-none block w-full pl-10 pr-10 py-2 bg-gray-700 border-2 border-purpura rounded-lg placeholder-gray-500 focus:outline-none focus-purpura text-white sm:text-sm transition duration-150 ease-in-out"
                            disabled={isLoading}
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-purpura focus:outline-none"
                            tabIndex={-1}
                            onClick={() => setShowConfirmPassword((prev) => !prev)}
                        >
                            {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                    </div>
                </div>

                {/* Manejo de Mensajes */}
                {(error || success) && (
                    <div className={`p-3 rounded-lg border text-sm ${error ? 'bg-red-900 border-red-700 text-red-400' : 'bg-green-900 border-green-700 text-green-400'}`}>
                        {error || success}
                    </div>
                )}

                {/* Botón de Envío */}
                <div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full flex justify-center items-center py-2 px-4 rounded-lg shadow-lg text-sm font-medium text-black transition-all duration-300 
                            ${isLoading ? 'bg-gray-600' : 'bg-[#D1A121] hover:bg-[#b0891c] hover:scale-[1.02]'}`}
                    >
                        {isLoading ? 'Registrando...' : <><Zap className="h-4 w-4 mr-2" /> Registrar Cuenta</>}
                    </button>
                </div>

                {/* 2. CORRECCIÓN DE ENLACES INFERIORES */}
                <div className="mt-4 pt-4 border-t border-white/10 space-y-3">
                    <p className='text-gray-400 text-center text-sm'>
                        ¿Ya tienes una cuenta?{' '}
                        <button 
                            type="button" 
                            onClick={switchToLogin} 
                            className="font-medium text-[#D1A121] hover:underline transition-colors"
                        >
                            Inicia sesión aquí
                        </button>
                    </p>
                    <p className='text-gray-500 text-center text-xs'>
                        ¿Problemas?{' '}
                        <button 
                            type="button" 
                            onClick={switchToContact} 
                            className="font-medium text-purple-400 hover:text-[#D1A121] underline transition-colors"
                        >
                            Contáctanos
                        </button>
                    </p>
                </div>
            </form>
        </div>
    );
};
export default Register;