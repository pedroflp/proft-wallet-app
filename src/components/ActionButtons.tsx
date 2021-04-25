import React, { useState } from 'react';
import { Text, StyleSheet, Dimensions } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';

import { Ionicons } from '@expo/vector-icons'; 
import { Octicons } from '@expo/vector-icons';

import { deleteCardAction } from '../store/actions/DeleteCard';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { toggleViewNumberCard } from '../store/actions/toggleViewNumberCard';

type Props = {
  activeCard: number,
}

type Card = {
  cardId: number,
  cardName: string, 
  cardUsername: string, 
  cardNumber: string,
  hideCardNumber: boolean,
}

const ActionButtons: React.FC<Props> = (props) => {
  const cards = useSelector((state: RootStateOrAny) => state.createCard.data);
  const dispatch = useDispatch();
  
  function handleDeleteCard() {
    cards.map((card: Card) => {     
      if (card.cardId === props.activeCard ) {
        dispatch(deleteCardAction(card.cardId))
      }
    })
  }

  function showcards() {
    cards.map((card: Card) => {
      console.log(card);
      
    })
  }

  function handleToggleViewCardNumber() {
    cards.map((card: Card) => {    
      if (card.cardId === props.activeCard ) {
        dispatch(toggleViewNumberCard(
          card.cardId,
          !card.hideCardNumber,
        ))
      }
    })
  }

  return (
   <>
    <RectButton onPress={handleToggleViewCardNumber} activeOpacity={0.7} style={styles.button}>
      <Ionicons 
        name="eye-outline" 
        size={25} 
        style={{ width: 25 }}
        color="#2D2940" 
      />
      <Text style={styles.title}>Esconder número</Text>
    </RectButton>

    <RectButton onPress={handleDeleteCard} activeOpacity={0.7} style={styles.button}>
      <Octicons 
        name="trashcan" 
        size={25} 
        style={{ width: 25 }}
        color="red" 
      />
      <Text style={styles.titleRed}>Apagar cartão</Text>
    </RectButton>
    <RectButton onPress={showcards} activeOpacity={0.7} style={styles.button}>
      <Text style={styles.titleRed}>show</Text>
    </RectButton>
   </>
  );
}

export { ActionButtons };

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    width: Dimensions.get('window').width*0.84,
    height: 65,
    backgroundColor: colors.white,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 8,
    padding: 25,
    borderRadius: 10,
  },
  title: {
    marginLeft: 22,
    fontFamily: fonts.heading,
    textTransform: 'uppercase',
    color: colors.textComplement,
  }, 
  titleRed: {
    marginLeft: 22,
    fontFamily: fonts.heading,
    textTransform: 'uppercase',
    color: colors.red,
  }
})