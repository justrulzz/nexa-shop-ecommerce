import { Row, Col, Card, Statistic, Spin, message } from "antd";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";


const apiUrl = import.meta.env.VITE_API_BASE_URL;
const MY_STRIPE_SECRET_KEY = import.meta.env.VITE_API_STRIPE_SECRET_KEY;

const DashboardPage = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        
        let currentTotalUsers = 0;

       
        const usersRes = await fetch(`${apiUrl}/api/users`);
        if (usersRes.ok) {
          const usersData = await usersRes.json();
          currentTotalUsers = usersData.length;
          setTotalUsers(currentTotalUsers);
        }

       
        const productsRes = await fetch(`${apiUrl}/api/products`);
        if (productsRes.ok) {
          const productsData = await productsRes.json();
          setTotalProducts(productsData.length);
        }

      
        const stripeRes = await fetch(`https://api.stripe.com/v1/payment_intents`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${MY_STRIPE_SECRET_KEY}`,
          },
        });

        if (stripeRes.ok) {
          const { data } = await stripeRes.json();
          
          const successfulPayments = data.filter(payment => payment.status === "succeeded");
          const totalAmount = successfulPayments.reduce((acc, curr) => acc + curr.amount, 0);
          
          setTotalRevenue((totalAmount / 100).toFixed(2));

          
          const dynamicSalesData = [
            { name: "Ocak", satilanUrunSayisi: 10, musteriSayisi: 5 },
            { name: "Şubat", satilanUrunSayisi: 15, musteriSayisi: 12 },
            { name: "Mart", satilanUrunSayisi: 20, musteriSayisi: 18 },
            { name: "Nisan", satilanUrunSayisi: 25, musteriSayisi: 20 },
            { name: "Mayıs", satilanUrunSayisi: successfulPayments.length, musteriSayisi: currentTotalUsers },
            { name: "Haziran", satilanUrunSayisi: 35, musteriSayisi: 30 },
          ];
          
          setSalesData(dynamicSalesData);
        } else {
          message.error("Stripe verileri alınamadı.");
        }

      } catch (error) {
        console.log("Veri çekme hatası:", error);
        message.error("Dashboard verileri yüklenirken bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); 

  return (
    <Spin spinning={loading}>
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic title="Toplam Ürün Sayısı" value={totalProducts} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Toplam Müşteri Sayısı" value={totalUsers} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Toplam Gelir" value={totalRevenue} prefix="$" />
          </Card>
        </Col>
      </Row>

      <Card style={{ marginTop: "20px" }}>
        <h2>Aylık Satış ve Müşteri Analizi</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={salesData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="satilanUrunSayisi"
              name="Satış Sayısı"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
              strokeWidth={3}
            />
            <Line
              type="monotone"
              dataKey="musteriSayisi"
              name="Müşteri Sayısı"
              stroke="#82ca9d"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </Spin>
  );
};

export default DashboardPage;