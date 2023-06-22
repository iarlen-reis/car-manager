/* eslint-disable import/no-absolute-path */
import deliveryImage from 'public/deliveryImage.png'
import Image from 'next/image'
export default function Home() {
  return (
    <div className="mt-4 flex min-h-screen w-full flex-col gap-3 lg:mt-11 lg:grid lg:grid-cols-2 lg:gap-2">
      <section>
        <div className="flex flex-col gap-2">
          <h1 className="font-itim text-4xl text-emerald-500 lg:text-5xl">
            Car Mananger
          </h1>
          <p className="mt-2 max-w-[500px] text-base italic text-emerald-400 md:max-w-[700px] lg:w-full lg:text-xl">
            Gerencie seus <span className="font-bold">clientes</span>,{' '}
            <span className="font-bold">condutores</span> e{' '}
            <span className="font-bold">veículos</span> de forma fácil e
            simples! Escolha o veículo e o condutor e comece o deslocamento!
          </p>
          <p className="mt-2 max-w-[500px] text-base italic text-emerald-400 md:max-w-[700px] lg:w-full lg:text-xl">
            Além disso, também é possivel gerenciar o{' '}
            <span className="font-bold">deslocamento</span> dos veículos,
            podendo verificar o inicio de um deslocamento e seu final.
          </p>
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
