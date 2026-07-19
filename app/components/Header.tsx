'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Link href="/">
            <Image
              src="https://www.bftech.es/assets/img/logoBFT.svg"
              alt="BFTech Logo"
              width={120}
              height={32}
              priority
            />
          </Link>
        </div>

        <button
          className={`${styles.hamburger} ${open ? styles.open : ''}`}
          onClick={() => setOpen(!open)}
          aria-label="Abrir menú"
          aria-expanded={open}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      <div className={`${styles.menuOverlay} ${open ? styles.open : ''}`}>
        <nav className={styles.menuOverlayNav}>
          <a href="https://www.bftech.es" onClick={() => setOpen(false)}>Inicio</a>
          <a href="https://www.bftech.es/servicios.html" onClick={() => setOpen(false)}>Servicios</a>
          <a href="https://www.bftech.es/nosotros.html" onClick={() => setOpen(false)}>Sobre Nosotros</a>
          <a href="https://www.bftech.es/proyectos.html" onClick={() => setOpen(false)}>Proyectos</a>
          <Link href="/" onClick={() => setOpen(false)} style={{ color: '#F5C800' }}>News</Link>
          <a href="https://www.bftech.es/contacto.html" onClick={() => setOpen(false)}>Contacto</a>
        </nav>
        <footer className={styles.menuOverlayNavFooter}>
          <a href="https://www.linkedin.com/company/bftech-consultora-tecnológica/" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href="https://www.instagram.com/bftech.es/" target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
        </footer>
      </div>
    </>
  );
}