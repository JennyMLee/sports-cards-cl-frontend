import Layout from "../../components/Layout"
import { API_URL } from '../../config/index'
import styles from '../../styles/Set.module.css'
import Image from 'next/image'
import Link from 'next/link'
import React, { Component } from 'react'
import Select from 'react-select'
import { useState } from 'react';
import Router from 'next/router'
import GoBack from '../../components/GoBack'

const comingSoonURL = "https://res.cloudinary.com/df4ohxhsp/image/upload/v1639539663/coming_soon_f24b9af3a0.jpg"

export default function SetsPage({ st, product, player }) {
    const cards = st.attributes.cards.data
    const players = player.attributes.cards.data
    function getFindInString(find) {
        let findAllString = '';
        let counter = 1;
        const findSize = find.length;
        {
            find.map((each) => {
                findAllString = findSize == counter ? findAllString + each : findAllString + each  + ", " ;
                counter ++;
            })
        }
        return findAllString;
    }

    const parallels = st.attributes.parallels.parallels
    const [currentCardSelection, setCardSelection] = useState({
        playerFirstName: cards[0].attributes.players.data[0].attributes.first_name,
        playerLastName: cards[0].attributes.players.data[0].attributes.last_name,
        currentTeam: players[0].attributes.players.data[0].attributes.team.data.attributes.name,
        cardNumber: cards[0].attributes.card_number,
        team: cards[0].attributes.teams.data[0].attributes.name,
        imageURL: cards[0].attributes.image.data ? cards[0].attributes.image.data[0].attributes.formats.medium.url : comingSoonURL,
        error: cards[0].attributes.note ? cards[0].attributes.note : null,
    });
    const [currentParallelSelection, setParallelSelection] = useState({
        printRun: parallels[0].printRun,
        find: getFindInString(parallels[0].find),
        odds: parallels[0].odds,
    });

    if (cards === null){
        return <div/>
    }

    function onCardSelectionUpdate(props) {
        const cardSelected = cards[props.value - 1].attributes
        const cardPlayerSelected = players[props.value - 1].attributes
        setCardSelection(previousState => {
            return {
                ...previousState,
                playerFirstName: cardSelected.players.data[0].attributes.first_name,
                playerLastName: cardSelected.players.data[0].attributes.last_name,
                currentTeam: cardPlayerSelected.players.data[0].attributes.team.data.attributes.name,
                cardNumber: cardSelected.card_number,
                team: cardSelected.teams.data[0].attributes.name,
                imageURL: cardSelected.image.data ? cardSelected.image.data[0].attributes.formats.medium.url : comingSoonURL,
                error: cardSelected.note ?  cardSelected.note : null,
            }
        });
    }

    function onParallelSelectionUpdate(props) {
        const parallelSelected = parallels[props.value - 1]
        setParallelSelection(previousState => {
            return {
                ...previousState,
                printRun: parallelSelected.printRun,
                find: getFindInString(parallelSelected.find),
                odds: parallelSelected.odds,
            }
        });
    }

    const cardOptions = []
    const parallelOptions = []
    let counter = 1;
    cards.map((card) => {
        cardOptions.push({ value: counter, label: card.attributes.card_number + ' - ' + (card.attributes.players.data[0].attributes.first_name ?? '') + ' ' + (card.attributes.players.data[0].attributes.last_name ?? '')})
        counter = counter +1
    })
    parallels.map(( parallel) => {
        parallelOptions.push({ value: parallel.id, label: parallel.name })
    })

    return (
        <Layout title={st.attributes.name}>
            <div className={styles.event}>
                {product.attributes.product.data ? 
                    <GoBack link={'/products/' + product.attributes.product.data.attributes.slug} name={product.attributes.product.data.attributes.name}/>
                : null}
                <div className={styles.selectionSection}>
                    <div className={styles.selectionSectionContent}>
                        <h1>{st.attributes.name}
                        </h1>
                        <p>Set Size: {st.attributes.set_size}
                        </p>
                        <Select defaultValue={cardOptions[0]} options={cardOptions} onChange={onCardSelectionUpdate} />
                        <div className={styles.selectionSectionImage}>
                            <div className={styles.selectionSectionImageContent}>
                                <Image src={currentCardSelection.imageURL} width={225} height={275} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.cardInfoSection}>
                    <div className={styles.cardInfoSectionContent}>
                        <div className={styles.cardItemContent}>
                            <h3>Card Selected Info
                            </h3>
                            {currentCardSelection.error ?
                                <>
                                    <h2 className={styles.errorContent}> {currentCardSelection.error}
                                    </h2>
                                    <p>Error(s)
                                    </p> </> : null
                            }
                            <h4>
                                {currentCardSelection.playerFirstName ? currentCardSelection.playerFirstName : null}
                                {currentCardSelection.playerLastName ? ' ' + currentCardSelection.playerLastName : null}
                            </h4>
                            <p>Player
                            </p>
                            <h4> {currentCardSelection.cardNumber}
                            </h4>
                            <p>Card
                            </p>
                            {currentCardSelection.team != currentCardSelection.currentTeam ?
                                <>
                                    <h4> {currentCardSelection.team}
                                    </h4>
                                    <p>Team (On card)
                                    </p>
                                    <h4> {currentCardSelection.currentTeam}
                                    </h4>
                                    <p>Current Team
                                    </p></> :
                                <>
                                    <h4> {currentCardSelection.team}
                                    </h4>
                                    <p>Team
                                    </p>
                                </>
                            }
                        </div>
                        <div className={styles.cardItemContent}>
                            <h3>Parallels
                            </h3>
                            <div className={styles.cardParallelDropdown}>
                                <Select defaultValue={parallelOptions[0]} options={parallelOptions} onChange={onParallelSelectionUpdate} />
                            </div>
                            <h4> {currentParallelSelection.printRun}
                            </h4>
                            <p>Print Run
                            </p>
                            <h4> {currentParallelSelection.odds}
                            </h4>
                            <p>Odds
                            </p>
                            <h4> {currentParallelSelection.find}
                            </h4>
                            <p>Found in
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export async function getServerSideProps({ params: { slug } }) {
    const res = await fetch(`${API_URL}/api/all-sets?filters[slug][$eq]=${slug}&populate[cards][populate]=*`)
    const sets = await res.json()
    const res2 = await fetch(`${API_URL}/api/all-sets?filters[slug][$eq]=${slug}&populate=product`)
    const product =  await res2.json()
    const res3 = await fetch(`${API_URL}/api/all-sets?filters[slug][$eq]=${slug}&populate[cards][populate][players][populate]=*`)
    const player = await res3.json()

    return {
        props: { st: sets.data[0], product: product.data[0], player: player.data[0] }
    }
}

/*export async function getStaticPaths() {
    const res = await fetch(`${API_URL}/api/all-sets`)
    console.log(res);
    const sets = await res.json()
    const paths = sets.map(set => ({ params: { slug: set.slug } }))
    return {
        paths,
        fallback: false
    };
}

export async function getStaticProps({ params: { slug } }) {
    const res = await fetch(`${API_URL}/api/all-sets/${slug}`)
    const sets = await res.json()
    return {
        props: { st: sets[0] }
    }
}*/
