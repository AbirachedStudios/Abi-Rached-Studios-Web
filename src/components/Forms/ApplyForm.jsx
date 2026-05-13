import React, { useState } from 'react';
import { Send, Briefcase, Upload, Link, FileText } from 'lucide-react'; 
import axios from 'axios';

const API_URL = 'http://localhost:3001/api/applications/applicationSend'; 

const Apply = ({ switchToLogin }) => {
    const [formData, setFormData] = useState({
        website: '',
        cvFile: null,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setError('');
        setSuccess('');
    };
    
    const handleFileChange = (e) => {
        setFormData({ ...formData, cvFile: e.target.files[0] });
        setError('');
        setSuccess('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!formData.cvFile || !formData.website) {
            return setError('Por favor, sube tu CV y proporciona tu página web.');
        }

        setIsLoading(true);
        
       // --- PREPARACIÓN DE DATOS PARA EL BACKEND ---
        // 1. Creamos un objeto FormData para enviar datos mixtos (texto y archivo).
        const dataToSend = new FormData();
        dataToSend.append('website', formData.website);
        dataToSend.append('cvFile', formData.cvFile); 
        
        try {
            const response = await axios.post(API_URL, dataToSend);

            const result = response.data; 
            setSuccess(result.message || `¡Postulación enviada con éxito! Archivo: ${formData.cvFile.name}`);
            
            // Opcional: limpiar el formulario después del éxito
            setFormData({ website: '', cvFile: null }); 

        } catch (err) {
            console.error('Error de postulación:', err);
            const errorMessage = err.response?.data?.message || err.message || 'Ocurrió un error de conexión. Inténtalo de nuevo.';
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    // Estilo para el botón de subida de archivo
    const fileButtonClass = "cursor-pointer w-full flex items-center justify-center py-2 px-4 border border-purpura rounded-lg shadow-sm text-sm font-medium text-white bg-gray-700 hover:bg-gray-600 transition duration-150 ease-in-out";

    return (
        <div className="w-full max-w-lg bg-gray-900 p-8 rounded-xl shadow-2xl border border-gray-700 animate-fade-in-up">
            
            {/* Título: Postulate acá */}
            <h1 className="text-4xl font-extrabold text-oro text-center mb-2 flex items-center justify-center">
                <Briefcase className="h-8 w-8 mr-3" />
                Postulate acá
            </h1>
            <p className="text-center text-sm text-gray-400 mb-8">
                Envíanos tu CV y un enlace a tu trabajo.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* 1. Campo Carga tu CV (Input de Archivo Personalizado) */}
                <div>
                    <label htmlFor="cvFile" className="block text-sm font-medium text-white mb-1">Carga tu CV (PDF, DOCX)</label>
                    <div className="mt-1 flex items-center space-x-3">
                        <input
                            id="cvFile"
                            name="cvFile"
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileChange}
                            className="hidden" // Ocultamos el input de archivo nativo
                            disabled={isLoading}
                        />
                        {/* Botón personalizado para disparar la selección de archivo */}
                        <label htmlFor="cvFile" className={fileButtonClass}>
                            <Upload className="h-5 w-5 mr-2" aria-hidden="true" />
                            {formData.cvFile ? formData.cvFile.name : 'Seleccionar Archivo...'}
                        </label>
                    </div>
                    {formData.cvFile && (
                        <p className="mt-2 text-xs text-purpura flex items-center">
                            <FileText className="h-4 w-4 mr-1"/> {formData.cvFile.name} ({Math.round(formData.cvFile.size / 1024)} KB)
                        </p>
                    )}
                </div>

                {/* 2. Campo Página Web */}
                <div>
                    <label htmlFor="website" className="block text-sm font-medium text-white">Tu Página Web / Portfolio</label>
                    <div className="mt-1 relative rounded-lg shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Link className="h-5 w-5 text-purpura" aria-hidden="true" />
                        </div>
                        <input
                            id="website"
                            name="website"
                            type="url"
                            required
                            value={formData.website}
                            onChange={handleChange}
                            placeholder="https://tu-portfolio.com"
                            className="appearance-none block w-full pl-10 pr-3 py-2 bg-gray-700 border-2 border-purpura rounded-lg placeholder-gray-500 focus:outline-none focus-purpura text-white sm:text-sm transition duration-150 ease-in-out"
                            disabled={isLoading}
                        />
                    </div>
                </div>

                {/* Manejo de Mensajes (Éxito/Error) */}
                {(error || success) && (
                    <div className={`p-3 rounded-lg border text-sm ${error ? 'bg-red-900 border-red-700 text-red-400' : 'bg-green-900 border-green-700 text-green-400'}`}>
                        {error || success}
                    </div>
                )}

                {/* Botón de Envío */}
                <div className='pt-2'>
                    <button
                        type="submit"
                        className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-lg font-bold text-gray-900 uppercase transition duration-300 ease-in-out 
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
                            <Send className="h-5 w-5 mr-2" aria-hidden="true" />
                        )}
                        {isLoading ? 'Enviando Postulación...' : 'POSTULARME'}
                    </button>
                </div>

                {/* Enlace de vuelta al Login */}
                <div className="flex items-center justify-center text-sm pt-4">
                    <button 
                        type="button" 
                        onClick={switchToLogin} 
                        className="font-medium text-gray-400 hover:text-oro-light underline transition-colors"
                    >
                        Volver a Inicio de Sesión
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Apply;
