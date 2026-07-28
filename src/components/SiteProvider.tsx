'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger, registerGsap, prefersReducedMotion } from '@/lib/motion';
import { setLenis, startScroll, stopScroll } from '@/lib/scroll';

type SiteState = {
  /** True once the loader has finished — gates every above-the-fold reveal. */
  ready: boolean;
  finishIntro: () => void;
  menuOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
  modalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

const SiteContext = createContext<SiteState | null>(null);

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error('useSite must be used inside <SiteProvider>');
  return ctx;
}

export function SiteProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  /* Element that opened the current overlay, so focus can go back to it. */
  const lastTrigger = useRef<HTMLElement | null>(null);

  const remember = () => {
    const active = document.activeElement;
    lastTrigger.current = active instanceof HTMLElement ? active : null;
  };

  const restoreFocus = () => {
    lastTrigger.current?.focus?.();
    lastTrigger.current = null;
  };

  const finishIntro = useCallback(() => setReady(true), []);

  const openMenu = useCallback(() => {
    remember();
    setMenuOpen(true);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    restoreFocus();
  }, []);

  const openModal = useCallback(() => {
    remember();
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    restoreFocus();
  }, []);

  /* ── smooth scroll, wired to GSAP's ticker ───────────────────── */
  useEffect(() => {
    registerGsap();
    window.scrollTo(0, 0);

    if (prefersReducedMotion()) return;

    const lenis = new Lenis({ smoothWheel: true });
    setLenis(lenis);

    const onScroll = () => ScrollTrigger.update();
    lenis.on('scroll', onScroll);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.off('scroll', onScroll);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  /* Positions settle once fonts and images have landed. */
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh).catch(() => {});
    window.addEventListener('load', refresh);
    return () => window.removeEventListener('load', refresh);
  }, []);

  /* One overlay at a time owns the scroll lock. */
  useEffect(() => {
    if (menuOpen || modalOpen) stopScroll();
    else if (ready) startScroll();
  }, [menuOpen, modalOpen, ready]);

  const value = useMemo<SiteState>(
    () => ({
      ready,
      finishIntro,
      menuOpen,
      openMenu,
      closeMenu,
      modalOpen,
      openModal,
      closeModal,
    }),
    [ready, finishIntro, menuOpen, openMenu, closeMenu, modalOpen, openModal, closeModal]
  );

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}
