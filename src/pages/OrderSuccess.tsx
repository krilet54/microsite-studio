import { useOrders } from '../context/OrderContext';
import { useEffect, useCallback, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';

export default function OrderSuccess() {
  const { currentOrder } = useOrders();
  const navigate = useNavigate();
  const location = useLocation();

  // Prefer order passed via navigation state to avoid any race conditions.
  const orderData = useMemo(() => {
    // @ts-ignore
    const passed = location.state?.order;
    return passed || currentOrder;
  }, [location.state, currentOrder]);

  useEffect(() => {
    if (!orderData) {
      navigate('/');
    }
  }, [orderData, navigate]);

  if (!orderData) return null;

  const generatePdf = useCallback(() => {
    const currentOrder = orderData;
    if (!currentOrder) return;
    const doc = new jsPDF({ unit: 'pt' });

    const lineHeight = 18;
    let y = 40;

    // Header
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.text('MICROSITE STUDIO', 40, y); y += lineHeight;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.text('Websites • Branding • Social Media', 40, y); y += lineHeight + 10;

    // Title & meta
    doc.setFontSize(15);
    doc.setFont('helvetica', 'bold');
    doc.text('Order Summary', 40, y); y += lineHeight;
    doc.setFontSize(11); doc.setFont('helvetica', 'normal');
  doc.text(`Order ID: ${currentOrder.orderId}`, 40, y); y += lineHeight;
  const date = new Date(currentOrder.createdAt);
    doc.text(`Date: ${date.toLocaleDateString()} ${date.toLocaleTimeString()}`, 40, y); y += lineHeight + 10;

    // Customer Details
    doc.setFont('helvetica', 'bold');
    doc.text('Customer Details', 40, y); y += lineHeight;
    doc.setFont('helvetica', 'normal');
    const safe = (v?: string) => v && v.trim().length ? v : '-';
    const details: string[] = [
      `Name: ${safe(currentOrder.pocName)}`,
      `Business: ${safe(currentOrder.businessName)}`,
      `Phone: ${safe(currentOrder.phone)}`,
      `Email: ${safe(currentOrder.email)}`,
      `Industry: ${safe(currentOrder.industry)}`,
      `Preferred Contact: ${safe(currentOrder.communicationMethod)}`
    ];
    details.forEach(d => { doc.text(d, 40, y); y += lineHeight; });
    y += 6;

    // Order Details
    doc.setFont('helvetica', 'bold');
    doc.text('Order Details', 40, y); y += lineHeight;
    doc.setFont('helvetica', 'normal');
  const addOnsList = currentOrder.addOns?.filter((a: string) => a !== 'Others') || [];
    const other = currentOrder.otherAddOn?.trim();
    const combinedAddOns = [...addOnsList, ...(other ? [other] : [])];
    const addOnText = combinedAddOns.length ? combinedAddOns.join(', ') : 'None';
    const orderLines: string[] = [
      `Service: ${safe(currentOrder.serviceType)}`,
      `Package: ${safe(currentOrder.packageName)}`,
      `Domain: ${safe(currentOrder.domainPreference)}`,
      'Payment: Pay After Delivery',
      `Add-ons: ${addOnText}`
    ];
    orderLines.forEach(l => { doc.text(l, 40, y); y += lineHeight; });

    if (currentOrder.notes && currentOrder.notes.trim()) {
      y += 6;
      doc.setFont('helvetica', 'bold');
      doc.text('Notes', 40, y); y += lineHeight;
      doc.setFont('helvetica', 'normal');
      const noteLines = doc.splitTextToSize(currentOrder.notes.trim(), 520);
  noteLines.forEach((nl: string) => { doc.text(nl, 40, y); y += lineHeight; });
    }

    // Footer
    y = Math.max(y + 20, 700);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'italic');
    doc.text('Thank you for choosing Microsite Studio! We’ll reach out via WhatsApp shortly.', 40, y);

    doc.save(`Microsite_Order_${currentOrder.orderId}.pdf`);
  }, [orderData]);

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 py-20 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl">✅</span>
        </div>
        <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-4">Thank you! Your order has been received.</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-10">We will reach out to you via WhatsApp shortly to begin your project. No upfront payment required.</p>
        <div className="bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl p-8 text-left space-y-4">
          <InfoRow label="Order ID" value={orderData.orderId} />
          <InfoRow label="Name" value={orderData.pocName || '-'} />
          <InfoRow label="Business Name" value={orderData.businessName || '-'} />
          <InfoRow label="Phone" value={orderData.phone || '-'} />
          <InfoRow label="Email" value={orderData.email || '-'} />
          {orderData.communicationMethod && <InfoRow label="Preferred Contact" value={orderData.communicationMethod} />}
          {orderData.serviceType && <InfoRow label="Service" value={orderData.serviceType} />}
          {orderData.packageName && <InfoRow label="Package" value={orderData.packageName} />}
          {orderData.domainPreference && <InfoRow label="Domain" value={orderData.domainPreference} />}
          {(() => {
            const addOns = (orderData.addOns || []).filter((a: string) => a !== 'Others');
            if (orderData.otherAddOn && orderData.otherAddOn.trim()) addOns.push(orderData.otherAddOn.trim());
            return addOns.length ? <InfoRow label="Add-ons" value={addOns.join(', ')} /> : null;
          })()}
          <InfoRow label="Payment Status" value="Pay After Delivery" highlight />
          {orderData.notes && orderData.notes.trim() && (
            <div className="pt-2 border-t border-dashed border-neutral-300 dark:border-neutral-700">
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Notes</p>
              <p className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap leading-relaxed">{orderData.notes.trim()}</p>
            </div>
          )}
        </div>
        <div className="mt-10 flex justify-center gap-4">
          <button onClick={() => navigate('/')} className="px-6 py-3 rounded-lg bg-[#FF2B2B] text-white text-sm font-semibold hover:bg-red-600 transition-colors">Go to Home</button>
          <button
            onClick={() => { generatePdf(); navigate('/order/summary', { state: { order: orderData } }); }}
            className="px-6 py-3 rounded-lg border border-gray-300 dark:border-neutral-700 text-gray-700 dark:text-gray-200 text-sm font-semibold hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors"
          >
            View Order
          </button>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-gray-500 dark:text-gray-400 font-medium">{label}</span>
      <span className={`font-semibold ${highlight ? 'text-[#FF2B2B]' : 'text-gray-900 dark:text-gray-100'}`}>{value}</span>
    </div>
  );
}
