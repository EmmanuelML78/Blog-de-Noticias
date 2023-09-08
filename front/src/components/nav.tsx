"use client";
import React, { useState } from "react";
import Link from "next/link";
import { signIn, useSession, signOut } from "next-auth/react";

function Nav() {
  const { data: session } = useSession();

  return (
    <nav className="flex items-center justify-between p-4 bg-blue-500 text-white">
      <Link href="/" className="flex items-center space-x-2 text-xl font-bold">
        <div className="w-8 h-8 bg-white text-blue-500 rounded-full flex items-center justify-center font-bold">
          BN
        </div>
        <span>Blog News</span>
      </Link>
      <div className="space-x-2">
        {session?.user ? (
          <>
            <Link
              href="/createnews"
              className="px-4 py-2 font-semibold text-white bg-blue-600 rounded">
              Crear Noticia
            </Link>
            <button
              onClick={async () => {
                await signOut({
                  callbackUrl: "/",
                });
              }}
              className="px-4 py-2 font-semibold text-white bg-red-600 rounded">
              Cerrar Sesión
            </button>
          </>
        ) : (
          <Link
            href="/login"
            className="px-4 py-2 font-semibold text-white bg-blue-600 rounded">
            Iniciar Sesión
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Nav;
