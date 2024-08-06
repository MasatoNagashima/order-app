import {BigButton} from "@/components/uiParts/BigButton";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <BigButton
              href="https://github.com/Nutlope/qrGPT"
              className="text-gray-700 border hover:bg-gray-50"
            >
              ボタン
            </BigButton>
    </main>
  );
}
