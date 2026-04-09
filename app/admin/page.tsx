"use client";
import React, { useState } from 'react';
import { 
  Plus, Edit3, Trash2, ArrowLeft, Save,
  Lock, LogOut, Loader2, Database, Settings, Mail, ShoppingBag, Clock, CheckCircle2, ChevronRight
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import { db } from '@/lib/firebase';
import { deleteDoc, doc } from 'firebase/firestore';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AdminPage() {
  const { isAdminLoggedIn, login, loginWithGoogle, logout } = useAuth();
  const { productsList, productsLoading, ordersList, ordersLoading, addProduct, updateProduct, deleteProduct, updateOrderStatus } = useData();

  const [adminView, setAdminView] = useState<'list' | 'form' | 'orders'>('list');
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const defaultForm = { name: '', price: '', desc: '', internalNotes: '', imageUrls: '' };
  const [productForm, setProductForm] = useState(defaultForm);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true); 
    setErrorMsg('');
    try { 
      await login(email, password); 
    } 
    catch (err: any) { 
      console.error(err);
      setErrorMsg(err.message || 'Error al intentar ingresar.'); 
    } 
    finally { 
      setIsLoggingIn(false); 
    }
  };

  const handleEditClick = (prod: any) => { setEditingProduct(prod); setProductForm({ ...prod, imageUrls: prod.images ? prod.images.join(', ') : '' }); setAdminView('form'); };
  const handleAddNewClick = () => { setEditingProduct(null); setProductForm(defaultForm); setAdminView('form'); };
  const handleDeleteProduct = async (id: string) => { if(window.confirm("¿Estás segura de eliminar este producto?")) await deleteProduct(id); };
  const handleDeleteOrder = async (id: string) => { if(window.confirm("¿Eliminar registro de pedido definitivamente?")) await deleteDoc(doc(db, 'orders', id)); };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    const imagesArray = productForm.imageUrls.split(',').map(url => url.trim()).filter(url => url !== '');
    const finalImages = imagesArray.length > 0 ? imagesArray : ['https://placehold.co/1280x900/ffe4e6/881337?text=Sin+Imagen'];
    const productData = { name: productForm.name, price: Number(productForm.price), desc: productForm.desc, internalNotes: productForm.internalNotes, images: finalImages };
    
    if (editingProduct) await updateProduct(editingProduct.id, productData);
    else await addProduct(productData);
    
    setIsSaving(false);
    setAdminView('list');
  };

  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-screen bg-[#FCFAFA] flex flex-col">
        <Navbar />
        <main className="grow flex items-center justify-center p-6">
          <div className="max-w-md w-full p-8 bg-white rounded-4xl shadow-xl border border-rose-50 animate-in fade-in zoom-in-95">
            <div className="flex flex-col items-center mb-8">
              <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mb-4 text-rose-400"><Lock className="w-8 h-8" strokeWidth={1.5} /></div>
              <h2 className="text-2xl font-serif text-rose-950">Acceso Seguro</h2>
              <p className="text-rose-950/50 text-sm font-light text-center mt-2">Ingresá con tu cuenta registrada en Firebase.</p>
            </div>
            {errorMsg && <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl text-center">{errorMsg}</div>}
            <form onSubmit={handleLogin} className="space-y-4">
              <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-[#FCFAFA] border border-rose-100 rounded-xl px-4 py-3 text-rose-950 focus:outline-none focus:border-rose-300" />
              <input type="password" placeholder="Contraseña" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-[#FCFAFA] border border-rose-100 rounded-xl px-4 py-3 text-rose-950 focus:outline-none focus:border-rose-300" />
              <button type="submit" disabled={isLoggingIn} className="w-full flex items-center justify-center gap-2 bg-rose-900 text-white py-4 rounded-xl font-bold tracking-widest hover:bg-rose-800 transition-colors shadow-lg disabled:opacity-70">
                {isLoggingIn ? <Loader2 className="w-5 h-5 animate-spin" /> : 'INGRESAR'}
              </button>
              
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-rose-100"></span></div>
                <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-rose-300">O también</span></div>
              </div>

              <button 
                type="button" 
                onClick={async () => {
                  setIsLoggingIn(true);
                  try { await loginWithGoogle(); } catch(e: any) { setErrorMsg(e.message); }
                  finally { setIsLoggingIn(false); }
                }} 
                disabled={isLoggingIn} 
                className="w-full flex items-center justify-center gap-2 bg-white border border-rose-200 text-rose-950 py-3 rounded-xl font-medium hover:bg-rose-50 transition-colors shadow-sm disabled:opacity-70"
              >
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="Google" />
                Continuar con Google
              </button>
            </form>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FCFAFA] flex flex-col">
      <Navbar />
      <main className="grow max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16 w-full">
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-rose-950 text-white p-8 rounded-4xl shadow-xl">
            <div>
              <div className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-rose-300 mb-2"><Settings className="w-3.5 h-3.5" strokeWidth={2} /> Panel de Control</div>
              <h2 className="text-3xl font-serif tracking-tight">{adminView === 'orders' ? 'Gestión de Pedidos' : 'Catálogo del Taller'}</h2>
            </div>
            <div className="flex items-center gap-3 bg-white/5 p-2 rounded-3xl">
              <button 
                onClick={() => setAdminView('list')} 
                className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold tracking-widest transition-all ${adminView !== 'orders' ? 'bg-white text-rose-950 shadow-lg' : 'text-rose-100 hover:bg-white/10'}`}
              >
                PRODUCTOS
              </button>
              <button 
                onClick={() => setAdminView('orders')} 
                className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold tracking-widest transition-all ${adminView === 'orders' ? 'bg-white text-rose-950 shadow-lg' : 'text-rose-100 hover:bg-white/10'}`}
              >
                PEDIDOS {ordersList.length > 0 && <span className="bg-rose-500 text-white w-5 h-5 flex items-center justify-center rounded-full text-[10px]">{ordersList.filter(o => o.status !== 'completado').length}</span>}
              </button>
              <div className="w-[1px] h-6 bg-white/20 mx-1"></div>
              <button onClick={logout} className="p-2.5 hover:bg-rose-500/20 text-rose-200 hover:text-white rounded-xl transition-colors" title="Cerrar sesión"><LogOut className="w-5 h-5" /></button>
            </div>
          </div>

          {adminView === 'orders' ? (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center justify-between mb-2 px-2">
                <h3 className="font-serif text-2xl text-rose-950">Pendientes de WhatsApp</h3>
                <div className="text-[10px] font-bold text-rose-400 uppercase tracking-[0.2em] bg-rose-50 px-3 py-1.5 rounded-full border border-rose-100">
                  {ordersList.length} TOTALES
                </div>
              </div>
              <div className="grid gap-4">
                {ordersLoading ? ( <div className="p-12 flex justify-center"><Loader2 className="w-6 h-6 text-rose-300 animate-spin" /></div> ) 
                : ordersList.length === 0 ? (
                  <div className="bg-white rounded-4xl p-16 text-center border-2 border-dashed border-rose-100">
                    <ShoppingBag className="w-12 h-12 text-rose-100 mx-auto mb-4" />
                    <p className="text-rose-950/40 font-light text-lg">No hay pedidos registrados en la base de datos.</p>
                  </div>
                ) : (
                  ordersList.map(order => (
                    <div key={order.id} className="bg-white rounded-3xl shadow-sm border border-rose-100 overflow-hidden hover:shadow-md transition-all group">
                      <div className="p-6">
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                          <div className="flex gap-4">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${order.status === 'completado' ? 'bg-green-50 text-green-500' : 'bg-rose-50 text-rose-400'}`}>
                              {order.status === 'completado' ? <CheckCircle2 className="w-6 h-6" /> : <Clock className="w-6 h-6" />}
                            </div>
                            <div>
                              <div className="flex items-center gap-3">
                                <h4 className="font-serif text-xl text-rose-950">{order.customerName}</h4>
                                <span className="text-[10px] font-mono bg-rose-50 text-rose-400 border border-rose-100 px-2 py-0.5 rounded-lg uppercase">#{order.orderId}</span>
                              </div>
                              <div className="text-xs text-rose-950/40 mt-1 flex items-center gap-4">
                                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {new Date(order.createdAt?.seconds * 1000 || Date.now()).toLocaleDateString('es-AR', { day: '2-digit', month: 'long', hour: '2-digit', minute: '2-digit' })}</span>
                                <span className={order.delivery === 'taller' ? 'text-amber-600' : 'text-blue-600'}>📍 {order.delivery === 'taller' ? 'Retiro en Taller' : 'Envío a Domicilio'}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 w-full sm:w-auto">
                            <button 
                              onClick={() => updateOrderStatus(order.id, order.status === 'completado' ? 'pendiente' : 'completado')}
                              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${order.status === 'completado' ? 'bg-green-500 text-white' : 'bg-[#FCFAFA] text-rose-950 border border-rose-100 hover:bg-rose-50'}`}
                            >
                              {order.status === 'completado' ? 'COMPLETADO' : 'MARCAR LISTO'}
                            </button>
                            <button onClick={() => handleDeleteOrder(order.id)} className="p-2.5 text-rose-200 hover:text-red-500 transition-colors"><Trash2 className="w-5 h-5" /></button>
                          </div>
                        </div>

                        <div className="mt-6 bg-[#FCFAFA] rounded-2xl border border-rose-50 group-hover:border-rose-100 transition-colors">
                           <div className="p-4 space-y-3">
                             {order.items?.map((item: any, i: number) => (
                               <div key={i} className="flex items-center justify-between text-sm">
                                 <div className="flex items-center gap-3">
                                   <div className="w-8 h-8 rounded-lg overflow-hidden border border-rose-100"><img src={item.images?.[0] || 'https://placehold.co/100x100?text=Item'} className="w-full h-full object-cover" /></div>
                                   <div>
                                     <p className="font-medium text-rose-950">{item.name}</p>
                                     <p className="text-[10px] text-rose-400 uppercase tracking-widest">{item.type}</p>
                                   </div>
                                 </div>
                                 <span className="font-mono font-bold text-rose-900">${item.price || item.basePrice}</span>
                               </div>
                             ))}
                             <div className="pt-3 mt-3 border-t border-rose-100 flex justify-between items-center">
                               <span className="text-xs font-bold text-rose-950/40 uppercase tracking-widest">Total del Pedido</span>
                               <span className="text-xl font-serif font-bold text-rose-950 underline decoration-rose-300 underline-offset-4">${order.total}</span>
                             </div>
                           </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          ) : adminView === 'list' ? (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="flex items-center justify-between px-2">
                <h3 className="font-serif text-2xl text-rose-950">Catálogo de Productos</h3>
                <button onClick={handleAddNewClick} className="bg-rose-900 text-white px-6 py-2.5 rounded-xl text-xs font-bold tracking-widest flex items-center gap-2 hover:bg-rose-800 transition-all shadow-lg shadow-rose-900/10"><Plus className="w-4 h-4" /> AGREGAR ARTÍCULO</button>
              </div>
              <div className="grid gap-4">
                {productsLoading ? ( <div className="p-12 flex justify-center"><Loader2 className="w-6 h-6 text-rose-300 animate-spin" /></div> ) 
                : productsList.length === 0 ? (
                  <div className="bg-white rounded-4xl p-16 text-center border-2 border-dashed border-rose-100">
                    <p className="text-rose-950/40 font-light text-lg">No hay productos en el catálogo.</p>
                  </div>
                ) : (
                  productsList.map(product => (
                    <div key={product.id} className="bg-white p-4 rounded-3xl shadow-sm border border-rose-50 hover:border-rose-200 transition-all flex items-center gap-6 group">
                      <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 border border-rose-50"><img src={product.images?.[0] || 'https://placehold.co/200x200?text=Sin+Imagen'} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" /></div>
                      <div className="grow py-2">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-serif text-lg text-rose-950">{product.name}</h4>
                          <span className="text-[10px] font-bold text-rose-300 uppercase tracking-widest border border-rose-100 px-2 rounded-full">ID: {product.id.slice(0,5)}</span>
                        </div>
                        <span className="text-rose-600 font-bold text-base block">${product.price}</span>
                        <p className="text-xs text-rose-950/40 font-light line-clamp-1 mt-1">{product.desc}</p>
                      </div>
                      <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity pr-2">
                        <button onClick={() => handleEditClick(product)} className="p-2.5 bg-rose-50 text-rose-900 rounded-xl hover:bg-rose-100 transition-colors"><Edit3 className="w-4 h-4" /></button>
                        <button onClick={() => handleDeleteProduct(product.id)} className="p-2.5 bg-white text-rose-200 hover:text-red-500 rounded-xl transition-colors"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-4xl shadow-sm border border-rose-100 p-8 animate-in fade-in zoom-in-95 duration-300">
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-rose-50">
                <h3 className="font-serif text-2xl text-rose-950">{editingProduct ? 'Editar Producto en BD' : 'Insertar Nuevo a BD'}</h3>
                <button onClick={() => setAdminView('list')} className="text-sm font-medium text-rose-400 hover:text-rose-600 flex items-center gap-1"><ArrowLeft className="w-4 h-4" /> Volver</button>
              </div>
              <form onSubmit={handleSaveProduct} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div><label className="block text-xs font-semibold uppercase tracking-widest text-rose-950/50 mb-2">Nombre *</label><input required type="text" value={productForm.name} onChange={(e) => setProductForm({...productForm, name: e.target.value})} className="w-full bg-[#FCFAFA] border border-rose-100 rounded-xl px-4 py-3 text-rose-950 focus:outline-none focus:border-rose-300" /></div>
                  <div><label className="block text-xs font-semibold uppercase tracking-widest text-rose-950/50 mb-2">Precio *</label><input required type="number" value={productForm.price} onChange={(e) => setProductForm({...productForm, price: e.target.value})} className="w-full bg-[#FCFAFA] border border-rose-100 rounded-xl px-4 py-3 text-rose-950 focus:outline-none focus:border-rose-300" /></div>
                </div>
                <div><label className="block text-xs font-semibold uppercase tracking-widest text-rose-950/50 mb-2">Descripción *</label><textarea required rows={3} value={productForm.desc} onChange={(e) => setProductForm({...productForm, desc: e.target.value})} className="w-full bg-[#FCFAFA] border border-rose-100 rounded-xl px-4 py-3 text-rose-950 focus:outline-none focus:border-rose-300 resize-none" /></div>
                <div className="bg-amber-50 p-6 rounded-xl border border-amber-100"><label className="block text-xs font-bold uppercase tracking-widest text-amber-800 mb-2">Notas Internas</label><textarea rows={2} value={productForm.internalNotes} onChange={(e) => setProductForm({...productForm, internalNotes: e.target.value})} className="w-full bg-white border border-amber-200 rounded-xl px-4 py-3 text-amber-900 focus:outline-none focus:border-amber-400 resize-none" /></div>
                <div><label className="block text-xs font-semibold uppercase tracking-widest text-rose-950/50 mb-2">URLs de imágenes</label><textarea rows={2} value={productForm.imageUrls} onChange={(e) => setProductForm({...productForm, imageUrls: e.target.value})} className="w-full bg-[#FCFAFA] border border-rose-100 rounded-xl px-4 py-3 text-rose-950 focus:outline-none focus:border-rose-300 font-mono text-sm" placeholder="URL1, URL2..." /></div>
                <div className="pt-6 border-t border-rose-50 flex justify-end gap-4">
                  <button type="button" onClick={() => setAdminView('list')} className="px-6 py-3 rounded-xl border border-rose-200 text-rose-950/60 font-medium hover:bg-rose-50 transition-all">Cancelar</button>
                  <button type="submit" disabled={isSaving} className="px-8 py-3 rounded-xl bg-rose-900 text-white font-bold tracking-wide flex items-center gap-2 hover:bg-rose-800 transition-all shadow-lg disabled:opacity-70">{isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />} Guardar</button>
                </div>
              </form>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}