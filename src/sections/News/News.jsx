import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ArrowRight, Calendar } from 'lucide-react';

const News = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/news');
                setNews(response.data);
            } catch (err) {
                console.error("Error cargando noticias:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, []);

    if (loading) return <div className="bg-black py-20 text-center text-[#D1A121]">Cargando arte...</div>;

    return (
        <section className="bg-black py-20 px-6 sm:px-10">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-5xl font-black text-[#D1A121] mb-16">Últimas Noticias</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {news.map((item) => (
                        <article key={item.id} className="group bg-[#121212] rounded-3xl border border-white/5 overflow-hidden">
                            {/* IMAGEN DINÁMICA */}
                            <div className="relative h-60 w-full overflow-hidden">
                                <img 
                                    src={item.image || '/default-news.jpg'} 
                                    alt={item.title} 
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                                />
                            </div>

                            <div className="p-8">
                                {/* TÍTULO DINÁMICO */}
                                <h3 className="text-2xl font-bold text-[#D1A121] mb-4">{item.title}</h3>
                                {/* RESUMEN DINÁMICO */}
                                <p className="text-white/70 text-sm mb-8">{item.summary}</p>
                                supabase
                                <div className="flex justify-between items-center text-[#3D9D9B] font-bold text-xs">
                                    <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                                    <span className="flex items-center gap-2">Explorar <ArrowRight size={14} /></span>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default News;