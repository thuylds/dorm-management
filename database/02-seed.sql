USE DormManagement;
GO
INSERT INTO DOM VALUES ('D01', N'Tòa A'), ('D02', N'Tòa B'), ('D03', N'Tòa C');
INSERT INTO ROOMTYPE VALUES (1, 4, 3500000), (2, 6, 2800000);
INSERT INTO ROOM VALUES
('A101','D01',1,0,'Male'), ('A102','D01',2,0,'Female'),
('B101','D02',1,0,'Male'), ('B102','D02',1,0,'Female'), ('C101','D03',2,0,'Male');
INSERT INTO BED VALUES
('A101-01','A101','Available'),('A101-02','A101','Available'),('A101-03','A101','Available'),('A101-04','A101','Available'),
('A102-01','A102','Available'),('A102-02','A102','Available'),('A102-03','A102','Available'),('A102-04','A102','Available'),('A102-05','A102','Available'),('A102-06','A102','Available'),
('B101-01','B101','Available'),('B101-02','B101','Available'),('B101-03','B101','Available'),('B101-04','B101','Available'),
('B102-01','B102','Available'),('B102-02','B102','Available'),('B102-03','B102','Available'),('B102-04','B102','Available'),
('C101-01','C101','Available'),('C101-02','C101','Available'),('C101-03','C101','Available'),('C101-04','C101','Available'),('C101-05','C101','Available'),('C101-06','C101','Available');
INSERT INTO STUDENT VALUES
(N'SV001',N'Nguyễn Văn An','2005-03-12','0901000001','an@example.com',N'Hà Nội','Male'),
(N'SV002',N'Trần Thị Bình','2005-07-21','0901000002','binh@example.com',N'Bắc Ninh','Female'),
(N'SV003',N'Lê Minh Cường','2005-11-02','0901000003','cuong@example.com',N'Hải Phòng','Male'),
(N'SV004',N'Phạm Thu Dung','2005-05-18','0901000004','dung@example.com',N'Nam Định','Female'),
(N'SV005',N'Hoàng Gia Huy','2004-12-08','0901000005','huy@example.com',N'Nghệ An','Male');
INSERT INTO STAFF VALUES (N'NV001',N'Lê Minh Quân','0909000001','Manager'),(N'NV002',N'Nguyễn Thị Hoa','0909000002','Cleaner');
INSERT INTO DOM_STAFF VALUES ('D01',N'NV001'),('D02',N'NV001'),('D01',N'NV002');
INSERT INTO CONTRACT VALUES
('HD001','A101-01',N'SV001','Summer2026','2026-05-01','2026-08-31','Active'),
('HD002','A101-02',N'SV003','Summer2026','2026-05-01','2026-08-31','Active'),
('HD003','A102-01',N'SV002','Summer2026','2026-05-01','2026-08-31','Active'),
('HD004','B101-01',N'SV005','Spring2026','2026-01-01','2026-04-30','Expired');
INSERT INTO INVOICE (InvoiceID,RoomID,BillingMonth,ElectricFee,WaterFee,InternetFee,Status) VALUES
('INV001','A101','2026-05-01',500000,200000,100000,'Paid'),
('INV002','A101','2026-06-01',550000,210000,100000,'Unpaid'),
('INV003','A102','2026-06-01',420000,180000,100000,'Unpaid'),
('INV004','B101','2026-06-01',300000,150000,100000,'Paid');
GO

