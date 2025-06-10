
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, QrCode, Camera, Upload, Scan } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const QRPayPage = () => {
  const navigate = useNavigate();
  const [scanMode, setScanMode] = useState(false);
  const fileInputRef = useRef(null);

  const recentQRPayments = [
    { id: 1, merchant: 'Carrefour Mall of Emirates', amount: 156.75, date: '2024-01-10' },
    { id: 2, merchant: 'Costa Coffee DIFC', amount: 32.50, date: '2024-01-09' },
    { id: 3,merchant: 'LuLu Hypermarket', amount: 293.25, date: '2024-01-05' },
  ];

  const handleFileBrowse = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          className="p-2 h-auto"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-xl font-bold text-[#171717]">QR Payment</h1>
      </div>

      {/* QR Scanner Area */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="text-center">
            {scanMode ? (
              <div className="bg-black rounded-xl aspect-square w-full max-w-sm mx-auto relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-48 border-2 border-[#F0FF3D] rounded-lg"></div>
                </div>
                <div className="absolute bottom-6 left-0 right-0 flex justify-center">
                  <Button 
                    onClick={() => setScanMode(false)}
                    className="bg-white text-black hover:bg-gray-100"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="w-24 h-24 bg-[#003D31] rounded-full flex items-center justify-center mx-auto">
                  <QrCode className="w-12 h-12 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-[#171717] mb-2">Scan to Pay</h2>
                  <p className="text-sm text-[#918EA4] mb-6">
                    Point your camera at a QR code or upload one from your gallery
                  </p>
                  <div className="flex flex-col space-y-3">
                    <Button 
                      onClick={() => setScanMode(true)}
                      className="h-12 bg-[#003D31] hover:bg-[#002822] text-white font-medium"
                    >
                      <Camera className="w-5 h-5 mr-2" />
                      Open Camera
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={handleFileBrowse}
                      className="h-12 border-2 border-[#F6F7F9] text-[#171717] hover:bg-[#F6F7F9]"
                    >
                      <Upload className="w-5 h-5 mr-2" />
                      Upload QR Code
                    </Button>
                    <input 
                      type="file" 
                      accept="image/*" 
                      ref={fileInputRef} 
                      className="hidden" 
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Recent QR Payments */}
      <div>
        <h2 className="text-lg font-semibold text-[#171717] mb-4">Recent QR Payments</h2>
        <div className="space-y-3">
          {recentQRPayments.map((payment) => (
            <Card key={payment.id} className="cursor-pointer hover:shadow-md transition-all duration-200 border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-[#003D31]/10 rounded-lg flex items-center justify-center">
                      <Scan className="w-5 h-5 text-[#003D31]" />
                    </div>
                    <div>
                      <h3 className="font-medium text-[#171717]">{payment.merchant}</h3>
                      <p className="text-xs text-[#918EA4]">{payment.date}</p>
                    </div>
                  </div>
                  <p className="font-semibold text-[#171717]">AED {payment.amount}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Card>

      {/* Generate Your QR */}
      <Card className="border-0 shadow-sm bg-[#FCFFEF]">
        <CardContent className="p-6 text-center">
          <div className="w-16 h-16 bg-[#F0FF3D] rounded-full flex items-center justify-center mx-auto mb-4">
            <QrCode className="w-8 h-8 text-[#003D31]" />
          </div>
          <h3 className="font-semibold text-[#171717] mb-2">Generate Your QR Code</h3>
          <p className="text-sm text-[#918EA4] mb-4">
            Let others scan your QR code to send you money directly
          </p>
          <Button variant="outline" className="border-[#003D31] text-[#003D31] hover:bg-[#003D31] hover:text-white">
            Generate QR
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default QRPayPage;
