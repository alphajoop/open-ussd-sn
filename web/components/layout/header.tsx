'use client';

import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import { ArrowLeft, Info } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface HeaderProps {
  showBackButton?: boolean;
}

export function Header({ showBackButton = false }: HeaderProps) {
  return (
    <header className="mb-8 w-full">
      <div className="mx-auto flex w-full max-w-3xl items-center justify-between">
        <Link href="/">
          <div className="relative h-28 w-28 md:h-32 md:w-32">
            <Image
              src="/images/logo.svg"
              alt="Open USSD SN logo"
              fill
              className="object-contain"
            />
          </div>
        </Link>
        <div className="flex items-center gap-2">
          {showBackButton ? (
            <Link href="/">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-[1.2rem] w-[1.2rem]" />
                <span className="sr-only">Retour</span>
              </Button>
            </Link>
          ) : (
            <Link href="/about">
              <Button variant="outline" size="icon">
                <Info className="h-[1.2rem] w-[1.2rem]" />
                <span className="sr-only">À propos</span>
              </Button>
            </Link>
          )}
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
