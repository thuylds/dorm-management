import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import sql from 'mssql';

const app = express();
app.use(cors());
app.use(express.json());

const pool = new sql.ConnectionPool({
  server: process.env.DB_SERVER,
  port: Number(process.env.DB_PORT || 1433),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  options: { encrypt: process.env.DB_ENCRYPT === 'true', trustServerCertificate: true }
});
const db = pool.connect();

app.get('/api/health', async (_req, res) => {
  try { await db; res.json({ ok: true }); } catch (error) { res.status(503).json({ ok: false, error: error.message }); }
});

app.get('/api/dashboard', async (_req, res) => {
  try {
    const request = (await db).request();
    const result = await request.query(`
      SELECT (SELECT COUNT(*) FROM DOM) AS doms,
             (SELECT COUNT(*) FROM ROOM) AS rooms,
             (SELECT COUNT(*) FROM BED WHERE BedStatus = 'Available') AS availableBeds,
             (SELECT COUNT(*) FROM CONTRACT WHERE Status = 'Active') AS activeContracts,
             (SELECT COUNT(*) FROM INVOICE WHERE Status = 'Unpaid') AS unpaidInvoices`);
    res.json(result.recordset[0]);
  } catch (error) { res.status(500).json({ error: error.message }); }
});

app.get('/api/rooms', async (_req, res) => {
  try {
    const result = await (await db).request().query(`
      SELECT r.RoomID, d.DomName, rt.TypeNumber AS capacity, r.CurrentOccupancy,
             rt.TypeNumber - r.CurrentOccupancy AS availablePlaces, r.RoomGender,
             (SELECT COUNT(*) FROM BED b WHERE b.RoomID = r.RoomID AND b.BedStatus = 'Available') AS availableBeds
      FROM ROOM r JOIN DOM d ON d.DomID = r.DomID JOIN ROOMTYPE rt ON rt.TypeID = r.TypeID
      ORDER BY r.RoomID`);
    res.json(result.recordset);
  } catch (error) { res.status(500).json({ error: error.message }); }
});

app.get('/api/students', async (_req, res) => {
  try {
    const result = await (await db).request().query(`
      SELECT s.StudentID, s.StudentName, s.Email, s.Gender, r.RoomID, b.BedID, c.Status
      FROM STUDENT s LEFT JOIN CONTRACT c ON c.StudentID = s.StudentID AND c.Status = 'Active'
      LEFT JOIN BED b ON b.BedID = c.BedID LEFT JOIN ROOM r ON r.RoomID = b.RoomID
      ORDER BY s.StudentName`);
    res.json(result.recordset);
  } catch (error) { res.status(500).json({ error: error.message }); }
});

app.get('/api/invoices', async (_req, res) => {
  try {
    const result = await (await db).request().query(`
      SELECT InvoiceID, RoomID, BillingMonth, TotalPrice, Status
      FROM INVOICE ORDER BY BillingMonth DESC, RoomID`);
    res.json(result.recordset);
  } catch (error) { res.status(500).json({ error: error.message }); }
});

app.listen(Number(process.env.PORT || 4000), () => console.log('Dorm API listening on port 4000'));

