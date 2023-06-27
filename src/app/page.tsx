import deliveryImage from 'public/deliveryImage.png'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col gap-5 lg:mt-11 lg:grid lg:grid-cols-2 lg:gap-2">
      <section className="lg:mt-8">
        <div className="flex flex-col gap-2 text-center lg:text-start xl:gap-3">
          <h1 className="xl:7xl font-ysabeau text-4xl font-bold tracking-wider text-emerald-700 sm:text-5xl lg:text-6xl">
            <span className="text-6xl sm:text-7xl xl:text-8xl">C</span>ar{' '}
            <span className="text-6xl sm:text-7xl xl:text-8xl">M</span>ananger
          </h1>
          <div className="flex flex-col items-center justify-center gap-1 lg:items-start lg:justify-start">
            <p className="xl:4xl max-w-[420px] font-ysabeau text-2xl font-semibold tracking-wider text-emerald-600 sm:text-3xl">
              Gerenciamento de clientes, codutores e veículos.
            </p>
          </div>
        </div>
      </section>
      <section className="w-full">
        <div className="flex w-full items-center justify-center">
          <Image
            src={deliveryImage}
            alt="Imagem de delivery"
            className="h-auto max-w-full"
          />
        </div>
      </section>
    </div>
  )
}
