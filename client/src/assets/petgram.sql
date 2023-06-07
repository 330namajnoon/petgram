-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Anamakine: 127.0.0.1
-- Üretim Zamanı: 08 Haz 2023, 00:18:40
-- Sunucu sürümü: 10.4.22-MariaDB
-- PHP Sürümü: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Veritabanı: `petgram`
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `pets`
--

CREATE TABLE `pets` (
  `name` varchar(20) NOT NULL,
  `type` varchar(20) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `storysadres`
--

CREATE TABLE `storysadres` (
  `_id` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `id` varchar(10) NOT NULL,
  `date` varchar(10) NOT NULL,
  `time` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Tablo döküm verisi `storysadres`
--

INSERT INTO `storysadres` (`_id`, `email`, `id`, `date`, `time`) VALUES
(1, 'sina.majnoonhjk@gmail.com', 'st123', '10-02-2023', '14:20'),
(2, 'sina.majnoonhjk@gmail.com', 'st124', '10-02-2023', '18:20'),
(3, 'mani.mani@gmail.com', 'st123', '10-02-2023', '18:20'),
(4, 'sina.majnoonhjk@gmail.com', 'st125', '10-02-2023', '18:20'),
(5, 'mani.mani@gmail.com', 'st124', '16-04-2023', '13:20'),
(6, 'mani.mani@gmail.com', 'st125', '10-01-2023', '18:20');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `users`
--

CREATE TABLE `users` (
  `name` varchar(20) NOT NULL,
  `lastName` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Tablo döküm verisi `users`
--

INSERT INTO `users` (`name`, `lastName`, `email`, `password`) VALUES
('sina', 'majnoon', 'sina.majnoonhjk@gmail.com', '*A4B6157319038724E3560894F7F932C8886EBFCF');

--
-- Dökümü yapılmış tablolar için indeksler
--

--
-- Tablo için indeksler `storysadres`
--
ALTER TABLE `storysadres`
  ADD PRIMARY KEY (`_id`);

--
-- Tablo için indeksler `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`email`);

--
-- Dökümü yapılmış tablolar için AUTO_INCREMENT değeri
--

--
-- Tablo için AUTO_INCREMENT değeri `storysadres`
--
ALTER TABLE `storysadres`
  MODIFY `_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
