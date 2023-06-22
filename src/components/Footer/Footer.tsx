import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="mt-10 w-full bg-emerald-600">
      <div className="mx-auto my-0 flex w-full max-w-[1350px] items-center justify-between gap-4 p-6">
        <div className="flex flex-col gap-4 sm:flex-row">
          <ul className="flex list-none flex-col gap-1">
            <li>
              <Link
                href="/clientes"
                className="font-poppins text-white no-underline hover:text-gray-300"
              >
                Clientes
              </Link>
            </li>
            <li>
              <Link
                href="/condutores"
                className="font-poppins text-white no-underline hover:text-gray-300"
              >
                Condutores
              </Link>
            </li>
          </ul>
          <ul className="flex list-none flex-col gap-1">
            <li>
              <Link
                href="/veiculos"
                className="font-poppins text-white no-underline hover:text-gray-300"
              >
                Veículos
              </Link>
            </li>
            <li>
              <Link
                href="/deslocamentos"
                className="font-poppins text-white no-underline hover:text-gray-300"
              >
                Deslocamentos
              </Link>
            </li>
          </ul>
        </div>
        <p className="font-poppins italic text-white">
          Feito por{' '}
          <a
            href="https://github.com/iarlen-reis"
            target="_blank"
            rel="noreferrer"
            className="text-white no-underline hover:text-purple-300 hover:underline"
          >
            Iarlen Reis
          </a>
        </p>
      </div>
    </footer>
  )
}

export default Footer
