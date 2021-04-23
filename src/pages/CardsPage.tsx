import React from 'react';
import { Text, SafeAreaView, View, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/core';

import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 
import { Octicons } from '@expo/vector-icons';

import { Card } from '../components/Card';
import { ActionButton } from '../components/ActionButton';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

const CardsPage: React.FC = () => {
  const navigation = useNavigation();
 
  const createNewCard = () => {
    navigation.navigate('CreateCardPage')
  }

  return (
    <SafeAreaView>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Cartões</Text>
        <TouchableOpacity onPress={createNewCard} activeOpacity={0.8} style={styles.createCardButton}>
          <Entypo  name='plus' size={25} />
          </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.cardContainer}>
          <Card />
          <Card />
        </View>
      </ScrollView>

      <View style={styles.actionContainer}>
        <Text style={styles.actionTitle}>Ações</Text>

        <View style={styles.actionButtonList}>
          <ActionButton title='Esconder número' type="toggleHide">
            <Ionicons 
              name="eye-outline" 
              size={25} 
              style={{ width: 25 }}
              color="#2D2940" 
            />
          </ActionButton>

          <ActionButton title='Apagar cartão' type="delete">
            <Octicons 
              name="trashcan" 
              size={25} 
              style={{ width: 25 }}
              color="red" 
            />
          </ActionButton>
        </View>
      </View>
    </SafeAreaView>  
  );
}

export { CardsPage };

const styles = StyleSheet.create({
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
    marginHorizontal: 20,
    flexDirection: 'row'
  },

  actionContainer: {
    marginTop: 44,
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