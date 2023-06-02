import { Space, Typography } from 'antd';
import axios from 'axios';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import cidToImageUrl from '../utils/cidToImageUrl';
import { useContract, useNFTs } from "@thirdweb-dev/react";
import React from "react";
import Container from "../components/Container/Container";
import NFTGrid from "../components/NFT/NFTGrid";

const { Text } = Typography;

function Games() {
  const [gameList, setGameList] = useState([]);
  const { contract, isLoading } = useContract("0x3c20e7b59BDaff750708ea965A15155079BB4eb7");
  console.log(contract,"martketplace");
  const { data, isLoading : nftloading } = useNFTs(contract);

  useEffect(() => {
    axios({
      baseURL: 'https://maildeep.info/app',
      url: '/game/list',
    }).then((res) => {
      const list = res.data?.data.map((i) => ({
        ...i,
        name: i.title,
        id: i.gameId,
        img: cidToImageUrl(i.cover),
      })) || [];
      setGameList(list);
    });
  }, []);
  return (
    <>
      <Head>
        <title>PolyEstate | on-chain zk property sell</title>
      </Head>
      <main style={{ paddingTop: '100px', paddingBottom: '200px' }}>
        <Text
          style={{
            display: 'inline-block',
            fontSize: '40px',
            lineHeight: '48px',
            fontWeight: '700',
            marginTop: '26px',
            marginBottom: '26px',
            width: '100%',
          }}
        >
          Properties for sale
        </Text>

    <Container maxWidth="lg">
      <NFTGrid
        data={data}
        isLoading={isLoading}
        emptyText={
          "Looks like there are no PolyEstate NFTs yet. Head to the create page to create some!"
        }
      />
    </Container>
        <section
          style={{
            display: 'grid',
            gridGap: '20px',
            gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
          }}
        >
          {gameList.length
            ? gameList.map((game) => (
                <Link
                  href={`/games/${game.id}`}
                  key={game.id}
                  style={{ width: '100%' }}
                >
                  <div
                    style={{
                      padding: '14px',
                      width: '285px',
                      minHeight: '384px',
                      boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.08)',
                      display: 'block',
                      overflow: 'hidden',
                      boxSizing: 'border-box',
                      borderRadius: '20px',
                    }}
                  >
                    <Image
                      src={game.img}
                      width={257}
                      height={257}
                      alt="games"
                      style={{ borderRadius: '12px' }}
                    />
                    <Space direction="vertical" style={{ padding: '14px 6px' }}>
                      <Text
                        style={{
                          lineHeight: '20px',
                          fontSize: '16px',
                          fontWeight: '700',
                        }}
                      >
                        {game.name}
                      </Text>
                      <Text
                        style={{
                          lineHeight: '20px',
                          fontSize: '16px',
                          whiteSpace: 'nowrap',
                          fontWeight: '700',
                          marginTop: '2px',
                        }}
                      >
                        {game.price} Matic
                      </Text>
                    </Space>
                  </div>
                </Link>
              ))
            : ''}
        </section>
      </main>
    </>
  );
}

export default Games;
