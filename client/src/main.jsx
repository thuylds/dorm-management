import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const money = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 });

function App() {
  const [tab, setTab] = useState('overview');
  const [dashboard, setDashboard] = useState({});
  const [rooms, setRooms] = useState([]);
  const [students, setStudents] = useState([]);
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    Promise.all(['/api/dashboard', '/api/rooms', '/api/students', '/api/invoices'].map((url) => fetch(url).then((r) => r.json())))
      .then(([d, r, s, i]) => { setDashboard(d); setRooms(r); setStudents(s); setInvoices(i); })
      .catch(() => {});
  }, []);

  const cards = [
    ['Tòa nhà', dashboard.doms ?? '-', '🏢'],
    ['Phòng', dashboard.rooms ?? '-', '🚪'],
    ['Giường trống', dashboard.availableBeds ?? '-', '🛏️'],
    ['Hợp đồng đang hiệu lực', dashboard.activeContracts ?? '-', '📄'],
  ];

  return <div className="app">
    <aside><div className="brand"><span>⌂</span><strong>Dorm<span>Hub</span></strong></div>
      <nav>{[['overview','Tổng quan','▦'],['rooms','Phòng & giường','▤'],['students','Sinh viên','♙'],['invoices','Hóa đơn','▣']].map(([key,label,icon]) =>
        <button className={tab === key ? 'active' : ''} onClick={() => setTab(key)} key={key}><i>{icon}</i>{label}</button>)}</nav>
      <div className="user"><div className="avatar">L</div><div><b>Lê Minh Quân</b><small>Quản lý ký túc xá</small></div></div>
    </aside>
    <main><header><div><p className="eyebrow">QUẢN LÝ KÝ TÚC XÁ</p><h1>{tab === 'overview' ? 'Tổng quan' : tab === 'rooms' ? 'Phòng & giường' : tab === 'students' ? 'Sinh viên' : 'Hóa đơn'}</h1></div><div className="header-actions"><span className="status-dot">●</span> Hệ thống đang hoạt động <button className="icon-btn">⚙</button></div></header>
      {tab === 'overview' && <><section className="cards">{cards.map(([label,value,icon]) => <div className="card" key={label}><div className="card-icon">{icon}</div><small>{label}</small><strong>{value}</strong></div>)}</section>
        <section className="content-grid"><div className="panel wide"><div className="panel-title"><div><h2>Tình trạng phòng</h2><p>Theo dõi sức chứa theo từng phòng</p></div><button className="link" onClick={() => setTab('rooms')}>Xem tất cả →</button></div><RoomTable rooms={rooms.slice(0, 5)} /></div><div className="panel"><div className="panel-title"><div><h2>Hóa đơn gần đây</h2><p>Cập nhật mới nhất</p></div></div><InvoiceList invoices={invoices.slice(0, 4)} /></div></section></>}
      {tab === 'rooms' && <div className="panel page-panel"><div className="panel-title"><div><h2>Danh sách phòng</h2><p>Sức chứa và giường còn trống</p></div></div><RoomTable rooms={rooms} /></div>}
      {tab === 'students' && <div className="panel page-panel"><div className="panel-title"><div><h2>Danh sách sinh viên</h2><p>Vị trí cư trú hiện tại</p></div></div><table><thead><tr><th>Mã SV</th><th>Họ tên</th><th>Email</th><th>Phòng</th><th>Giường</th><th>Trạng thái</th></tr></thead><tbody>{students.map(s => <tr key={s.StudentID}><td>{s.StudentID}</td><td><b>{s.StudentName}</b></td><td>{s.Email}</td><td>{s.RoomID || '—'}</td><td>{s.BedID || '—'}</td><td><Badge value={s.Status || 'Chưa xếp phòng'} /></td></tr>)}</tbody></table></div>}
      {tab === 'invoices' && <div className="panel page-panel"><div className="panel-title"><div><h2>Danh sách hóa đơn</h2><p>Theo dõi thanh toán dịch vụ</p></div></div><table><thead><tr><th>Mã hóa đơn</th><th>Phòng</th><th>Tháng</th><th>Tổng tiền</th><th>Trạng thái</th></tr></thead><tbody>{invoices.map(i => <tr key={i.InvoiceID}><td>{i.InvoiceID}</td><td><b>{i.RoomID}</b></td><td>{new Date(i.BillingMonth).toLocaleDateString('vi-VN')}</td><td>{money.format(i.TotalPrice)}</td><td><Badge value={i.Status} /></td></tr>)}</tbody></table></div>}
    </main>
  </div>;
}

function Badge({ value }) { return <span className={`badge ${value === 'Paid' || value === 'Active' ? 'good' : value === 'Unpaid' ? 'warn' : 'neutral'}`}>{value}</span>; }
function RoomTable({ rooms }) { return <table><thead><tr><th>Phòng</th><th>Tòa</th><th>Giới tính</th><th>Sức chứa</th><th>Giường trống</th><th>Trạng thái</th></tr></thead><tbody>{rooms.map(r => <tr key={r.RoomID}><td><b>{r.RoomID}</b></td><td>{r.DomName}</td><td>{r.RoomGender === 'Male' ? 'Nam' : 'Nữ'}</td><td>{r.CurrentOccupancy}/{r.capacity}</td><td>{r.availableBeds}</td><td><Badge value={r.availablePlaces > 0 ? 'Còn chỗ' : 'Đã đầy'} /></td></tr>)}</tbody></table>; }
function InvoiceList({ invoices }) { return <div className="invoice-list">{invoices.map(i => <div className="invoice-row" key={i.InvoiceID}><div><b>{i.RoomID}</b><small>{i.InvoiceID}</small></div><div className="invoice-right"><b>{money.format(i.TotalPrice)}</b><Badge value={i.Status} /></div></div>)}</div>; }

createRoot(document.getElementById('root')).render(<App />);

