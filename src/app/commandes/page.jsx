'use client';
import styles from './page.module.css';
import useOrderStore from '../store/orderStore';
import { Trash2 } from 'lucide-react';
import ProtectedRoute from '../components/ProtectedRoute';

export default function CommandesPage() {
  const { orders, updateRemainingTime, updateOrderStatus } = useOrderStore();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      orders.forEach(order => {
        if (order.status === 'en cours') {
          const newRemainingTime = order.remainingTime - 1;
          
          if (newRemainingTime <= 0) {
            updateOrderStatus(order.id, 'livré');
          } else {
            updateRemainingTime(order.id, newRemainingTime);
          }
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [orders, updateRemainingTime, updateOrderStatus]);

  const formatRemainingTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleDeleteClick = (orderId) => {
    setShowDeleteConfirm(orderId);
  };

  const handleDeleteConfirm = (orderId) => {
    // Supprimer la commande
    const updatedOrders = orders.filter(order => order.id !== orderId);
    // Mettre à jour le store
    useOrderStore.setState({ orders: updatedOrders });
    setShowDeleteConfirm(null);
  };

  const handleDeleteAll = () => {
    // Mettre à jour le store avec un tableau vide
    useOrderStore.setState({ orders: [] });
  };

  return (
    <ProtectedRoute>
      <div className={styles.container}>
        <h1>Mes Commandes</h1>
        
        <div className={styles.banner}>
          <span className={styles.orderCount}>
            ({orders.length}) commande{orders.length !== 1 ? 's' : ''}
          </span>
          {orders.length > 0 && (
            <button className={styles.deleteAllButton} onClick={handleDeleteAll}>
              <Trash2 size={18} />
              Supprimer les commandes
            </button>
          )}
        </div>
        
        <div className={styles.orderList}>
          {orders.map(order => (
            <div key={order.id} className={styles.orderCard}>
              <div className={styles.orderHeader}>
                <h3>{order.product.title}</h3>
                <div className={styles.headerActions}>
                  <span className={`${styles.status} ${styles[order.status]}`}>
                    {order.status}
                  </span>
                  <button 
                    className={styles.deleteButton}
                    onClick={() => handleDeleteClick(order.id)}
                    title="Supprimer la commande"
                  >
                    <Trash2 size={18} />
                  </button>
                  
                  {showDeleteConfirm === order.id && (
                    <div className={styles.deleteConfirm}>
                      <p>Voulez-vous supprimer cette commande ?</p>
                      <div className={styles.deleteActions}>
                        <button onClick={() => handleDeleteConfirm(order.id)}>
                          Supprimer
                        </button>
                        <button onClick={() => setShowDeleteConfirm(null)}>
                          Annuler
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className={styles.orderDetails}>
                <div className={styles.orderInfo}>
                  <p><strong>Commandé le:</strong> {formatDate(order.orderDate)}</p>
                  <p><strong>Livraison prévue:</strong> {formatDate(order.deliveryTime)}</p>
                  {order.status === 'en cours' && (
                    <p className={styles.countdown}>
                      <strong>Temps restant:</strong> {formatRemainingTime(order.remainingTime)}
                    </p>
                  )}
                </div>
                
                <div className={styles.productDetails}>
                  <p><strong>Taille:</strong> {order.selectedSize}</p>
                  <p><strong>Quantité:</strong> {order.quantity}</p>
                  <p><strong>Prix total:</strong> {order.totalPrice} 000 FCFA</p>
                </div>
                
                <div className={styles.customerInfo}>
                  <p><strong>Nom:</strong> {order.name}</p>
                  <p><strong>Adresse:</strong> {order.address}</p>
                  <p><strong>Téléphone:</strong> {order.phone}</p>
                </div>
              </div>
            </div>
          ))}
          
        </div>
        
      </div>
    </ProtectedRoute>
  );
}
