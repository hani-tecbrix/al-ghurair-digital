
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, CheckCircle2, Send, Receipt, Bell, CreditCard, Info, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NotificationsPage = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([
    { 
      id: 1, 
      title: 'Money Sent Successfully', 
      description: 'Your transfer of AED 1,000 to Mohammed Ahmed was completed successfully.', 
      date: '2024-01-12 10:45 AM', 
      isRead: false, 
      type: 'transaction',
      actionUrl: '/transactions/1'
    },
    { 
      id: 2, 
      title: 'New Bill Available', 
      description: 'Your DEWA bill of AED 250 is now available for payment.', 
      date: '2024-01-11 08:30 AM', 
      isRead: false, 
      type: 'bill',
      actionUrl: '/pay-bills'
    },
    { 
      id: 3, 
      title: 'Salary Received', 
      description: 'You have received a salary payment of AED 5,200 from Emirates NBD.', 
      date: '2024-01-08 09:15 AM', 
      isRead: true, 
      type: 'transaction',
      actionUrl: '/transactions/2'
    },
    { 
      id: 4, 
      title: 'Security Alert', 
      description: 'A new device was used to access your account. If this was not you, please contact us immediately.', 
      date: '2024-01-07 07:30 PM', 
      isRead: true, 
      type: 'security',
      actionUrl: '/profile'
    },
    { 
      id: 5, 
      title: 'Card Expiry Reminder', 
      description: 'Your card ending in 1234 will expire next month. Please update your payment details.', 
      date: '2024-01-07 11:20 AM', 
      isRead: true, 
      type: 'card',
      actionUrl: '/cards'
    },
    { 
      id: 6, 
      title: 'App Update Available', 
      description: 'A new version of Al Ghurair Exchange is available with exciting new features.', 
      date: '2024-01-05 03:15 PM', 
      isRead: true, 
      type: 'system',
      actionUrl: null
    },
  ]);

  const unreadCount = notifications.filter(notification => !notification.isRead).length;

  const markAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, isRead: true } : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, isRead: true })));
  };

  const getIconForType = (type) => {
    switch (type) {
      case 'transaction':
        return <Send className="w-5 h-5 text-[#003D31]" />;
      case 'bill':
        return <Receipt className="w-5 h-5 text-[#003D31]" />;
      case 'security':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'card':
        return <CreditCard className="w-5 h-5 text-[#003D31]" />;
      case 'system':
        return <Info className="w-5 h-5 text-[#003D31]" />;
      default:
        return <Bell className="w-5 h-5 text-[#003D31]" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="p-2 h-auto"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold text-[#171717]">Notifications</h1>
          {unreadCount > 0 && (
            <Badge className="bg-[#003D31] text-white">{unreadCount} new</Badge>
          )}
        </div>
        {unreadCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={markAllAsRead}
            className="text-[#003D31] hover:bg-[#F6F7F9]"
          >
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Mark all as read
          </Button>
        )}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.map((notification) => (
          <Card
            key={notification.id}
            className={`cursor-pointer hover:shadow-md transition-all duration-200 ${
              notification.isRead ? 'border-0 shadow-sm' : 'border-l-4 border-l-[#003D31] shadow-md'
            }`}
            onClick={() => {
              if (!notification.isRead) {
                markAsRead(notification.id);
              }
              if (notification.actionUrl) {
                navigate(notification.actionUrl);
              }
            }}
          >
            <CardContent className="p-4">
              <div className="flex items-start space-x-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  notification.isRead ? 'bg-[#F6F7F9]' : 'bg-[#003D31]/10'
                }`}>
                  {getIconForType(notification.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className={`font-medium ${notification.isRead ? 'text-[#171717]' : 'text-[#003D31]'}`}>
                      {notification.title}
                    </h3>
                    {!notification.isRead && (
                      <div className="w-2 h-2 bg-[#003D31] rounded-full"></div>
                    )}
                  </div>
                  <p className="text-sm text-[#918EA4] mb-2">{notification.description}</p>
                  <p className="text-xs text-[#918EA4]">{notification.date}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Notifications */}
      {notifications.length === 0 && (
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-[#F6F7F9] rounded-full flex items-center justify-center mx-auto mb-4">
            <Bell className="w-10 h-10 text-[#918EA4]" />
          </div>
          <h2 className="font-semibold text-[#171717] mb-2">No Notifications</h2>
          <p className="text-sm text-[#918EA4]">
            You're all caught up! There are no new notifications.
          </p>
        </div>
      )}

      {/* Clear All Button */}
      {notifications.length > 0 && (
        <div className="text-center">
          <Button variant="outline" className="text-[#918EA4] border-[#F6F7F9] hover:bg-[#F6F7F9]">
            Clear All Notifications
          </Button>
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;
