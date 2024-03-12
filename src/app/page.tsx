import Image from "next/image";
import Link from "next/link";
import { MDXRemote } from 'next-mdx-remote/rsc'
import fs from 'fs'
import path from 'path'

export default async function Home() {
  const content: any = (await fs.promises.readFile(path.join(process.cwd(), './src/app/readme/page.md'), 'utf8')).toString()
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      gap: 24
    }}>
      <div style={{
        display: "flex",
        justifyContent: "end",
        padding: 8,
        backgroundColor: "gray"
      }}>
        <Link href="/dashboard/">dashboard</Link>
      </div>
      <MDXRemote source={content} />
    </div>
  );
}
