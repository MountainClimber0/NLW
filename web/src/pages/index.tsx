interface HomeProps {
  poolCount: number;
  userCount: number;
  guessCount: number;
}
import logoImg from "../assets/logo.svg";
import Image from "next/image";
import appPreviewImg from "../assets/app-nlw-copa.png";
import usersAvatarExampleImg from "../assets/users-avatar-example.png";
import iconCheckImg from "../assets/icon-check.svg";
import { api } from "../lib/axios";
import { FormEvent, useState } from "react";

export default function Home(props: HomeProps) {
  const [poolTitle, setPoolTitle] = useState("");

  async function createPool(event: FormEvent) {
    event.preventDefault();

    try {
      const response = await api.post("/pools", {
        title: poolTitle,
      });
      const { code } = response.data;
      navigator.clipboard.writeText(code);

      alert(
        "bolão criado com sucesso,o codigo foi copiado para a area de transferencia"
      );
      setPoolTitle("");
    } catch (err) {
      alert("Falha o criar o bolão, tente novamente!");
    }
  }
  return (
    <div className="max-w-[1124px] h-screen mx-auto grid grid-cols-2 gap-28 items-center">
      <main>
        <Image src={logoImg} alt="" />
        <h1 className="mt-14 text-white text-5xl font-bold leading-tight">
          Crie seu proprio bolão da copa e compartilhe entre amigos!
        </h1>

        <div className="mt-10 flex items-center gap-2">
          <Image src={usersAvatarExampleImg} alt="" />
          <strong className="text-gray-100 text-xl">
            <span className="text-ignite-500">{props.userCount}</span> pessoas
            já estão usando
          </strong>
        </div>
        <form onSubmit={createPool} className="mt-10 flex gap-2 ">
          <input
            className="text-gray-100 flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 text-sm"
            type="text"
            required
            placeholder="qual o nome do seu bolao?"
            onChange={event => setPoolTitle(event.target.value)}
            value={poolTitle}
          />
          <button
            className="bg-yellow-500 px-6 py-4 rounded text-gray-900 font-bold uppercase hover:bg-yellow-600"
            type="submit"
          >
            criar meu bolão
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-300 leading-relaxed">
          Após criar seu bolão, você receberá um código único que poderá usar
          para convidar outras pessoas 🚀
        </p>

        <div className="mt-10 pt-10 border-t border-gray-600 flex  items-center justify-between text-gray-100">
          <div className="flex items-center gap-6">
            <Image src={iconCheckImg} alt="" />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+{props.poolCount}</span>
              <span>Bolões criados </span>
              <div />
            </div>
          </div>
          <div className="w-px h-14 bg-gray-600"></div>
          <div className="flex items-center gap-6">
            <Image src={iconCheckImg} alt="" />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+{props.guessCount}</span>
              <span>Palpites enviados </span>
              <div />
            </div>
          </div>
        </div>
      </main>
      <Image src={appPreviewImg} alt="celulares" quality={100} />
    </div>
  );
}
export const getServerSideProps = async () => {
  const [poolCountResponse, guessCountResponse, userCountResponse] =
    await Promise.all([
      api.get("pools/count"),
      api.get("guesses/count"),
      api.get("users/count"),
    ]);

  return {
    props: {
      userCount: userCountResponse.data.count,
      poolCount: poolCountResponse.data.count,
      guessCount: guessCountResponse.data.count,
    },
  };
};
