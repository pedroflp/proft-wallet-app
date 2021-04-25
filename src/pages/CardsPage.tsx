import React, { useState } from 'react';
import { Text, SafeAreaView, View, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { connect, RootStateOrAny, useDispatch, useSelector } from 'react-redux';

import { RectButton } from 'react-native-gesture-handler';

import { Entypo } from '@expo/vector-icons';

import { ActionButtons } from '../components/ActionButtons';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import Card from '../components/Card';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { setActiveCard } from '../store/actions/SetActiveCard';

type CardProps = {
  cardId: number,
  cardName: string,
  cardUsername: string,
  cardNumber: string,
  hideNumber: boolean,
}

type SliderCard = {
  item: CardProps,
  index: number,
}

const CardsPage: React.FC = () => {
  const navigation = useNavigation();

  const cards = useSelector((state: RootStateOrAny) => state.createCard.data);
  const dispatch = useDispatch();

  const [index, setIndex] = useState(0);
 
  function createNewCard() {
    navigation.navigate('CreateCardPage');
  }

  cards.map((card: CardProps) => {
    console.log(`Cartao ${card.cardId} - ${card.cardName} \n ${card.cardNumber}`);
  })
    
  const SliderCardItem = ({ item, index }: SliderCard) => (
    <Card
      cardId={item.cardId}
      cardName={item.cardName}
      cardUsername={item.cardUsername}
      cardNumber={item.cardNumber} 
      hideNumber={item.hideNumber}
      key={index}
    />
  ) 

  return (
    <SafeAreaView>
      <View style={styles.pageContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Cartões</Text>
          <RectButton onPress={createNewCard} activeOpacity={0.8} style={styles.createCardButton}>
            <Entypo  name='plus' size={25} />
          </RectButton>
        </View>

       <View style={styles.cardContainer}>
          <Carousel
            layout="default"
            layoutCardOffset={0}
            data={cards}
            renderItem={SliderCardItem}
            sliderWidth={Dimensions.get('window').width}
            itemWidth={Dimensions.get('window').width*0.85}
            onSnapToItem={(index) => {
              setIndex(index);
              dispatch(setActiveCard(index))
            }}
            useScrollView={false}
          />
          <Pagination
            dotsLength={cards.length}
            activeDotIndex={index}
            dotStyle={{
              width: 10,
              height: 10,
              borderRadius: 5,
              marginHorizontal: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.6)'
            }}
            inactiveDotOpacity={0.4}
            inactiveDotScale={1}
            tappableDots={false}
          />
       </View>

        { cards.length > 0 &&
        <View style={styles.actionContainer}>
          <Text style={styles.actionTitle}>Ações</Text>
          <View style={styles.actionButtonList}>
            <ActionButtons activeCard={index} />
          </View>
        </View>
        }

      </View>
    </SafeAreaView>  
  );
}

const mapStateToProps = (state: any) => ({
  cards: state.cards,
})

export default connect(mapStateToProps, null)(CardsPage)


const styles = StyleSheet.create({
  pageContainer: {
    paddingVertical: 50,
  }, 

  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30
  },
  headerTitle: {
    fontFamily: fonts.heading,
    fontSize: 40,
  },
  createCardButton: {
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 10,
    shadowOpacity: 1,
    shadowRadius: 5,
    shadowColor: colors.black,
    shadowOffset: { height: 20, width: 20 },
  },

  cardContainer: {
    marginVertical: 33,
  },

  actionContainer: {
    marginTop: 10,
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  actionTitle: {
    fontFamily: fonts.heading,
    color: colors.textSubTitle,
    fontSize: 16
  },
  actionButtonList: {
    marginTop: 15
  }
})