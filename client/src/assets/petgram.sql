-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-06-2023 a las 14:26:04
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `petgram`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pets`
--

CREATE TABLE `pets` (
  `pet_id` varchar(10) NOT NULL,
  `user_id` varchar(10) NOT NULL,
  `name` varchar(10) NOT NULL,
  `birthDay` date NOT NULL,
  `gender` varchar(1) NOT NULL,
  `type` int(2) NOT NULL,
  `race` int(2) NOT NULL,
  `description` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` varchar(10) NOT NULL,
  `email` varchar(50) NOT NULL,
  `name` varchar(10) NOT NULL,
  `lastName` varchar(15) NOT NULL,
  `birthDay` date NOT NULL,
  `address` varchar(50) NOT NULL,
  `country` int(2) NOT NULL,
  `postalCode` int(5) NOT NULL,
  `phone` int(9) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `email`, `name`, `lastName`, `birthDay`, `address`, `country`, `postalCode`, `phone`, `password`) VALUES
('1', 'usuario1@example.com', 'Juan', 'Pérez', '1990-05-15', 'Calle Principal 123', 1, 12345, 123456789, 'contraseña1'),
('10', 'usuario10@example.com', 'Marta', 'Jiménez', '1984-12-08', 'Avenida Central 890', 1, 1234, 987123654, 'contraseña10'),
('2', 'usuario2@example.com', 'María', 'García', '1985-09-20', 'Avenida Central 456', 1, 23456, 987654321, 'contraseña2'),
('3', 'usuario3@example.com', 'Carlos', 'López', '1998-02-10', 'Plaza Mayor 789', 1, 34567, 456123789, 'contraseña3'),
('4', 'usuario4@example.com', 'Laura', 'Martínez', '1992-11-30', 'Calle Secundaria 234', 1, 45678, 789456123, 'contraseña4'),
('5', 'usuario5@example.com', 'Pedro', 'Rodríguez', '1980-07-05', 'Avenida Principal 567', 1, 56789, 321654987, 'contraseña5'),
('6', 'usuario6@example.com', 'Ana', 'Sánchez', '1995-04-25', 'Calle Central 890', 1, 67890, 654987321, 'contraseña6'),
('7', 'usuario7@example.com', 'Javier', 'Gómez', '1987-08-18', 'Plaza Central 901', 1, 78901, 987321654, 'contraseña7'),
('8', 'usuario8@example.com', 'Sara', 'Fernández', '1993-03-12', 'Avenida Principal 234', 1, 89012, 321456987, 'contraseña8'),
('9', 'usuario9@example.com', 'Manuel', 'Hernández', '1996-06-22', 'Calle Principal 567', 1, 90123, 654789321, 'contraseña9');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `pets`
--
ALTER TABLE `pets`
  ADD PRIMARY KEY (`pet_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`,`email`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
