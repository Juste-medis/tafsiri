/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {Button, DataTable} from 'react-native-paper';
import ChallengeTop from '../../components/ChallengeTop';
import Globals from '../../Ressources/Globals';
import {styleChallenge as styles} from '../../Ressources/Styles';

const optionsPerPage = [2, 3, 4];

let partiarr = [
  {name: 'AKAM', valides: 500, rang: 1},
  {name: 'ALTO', valides: 150, rang: 2},
  {name: 'fréjus laleye', valides: 320, rang: 3},
  {name: 'FHN', valides: 188, rang: 4},
  {name: 'LSI', valides: 200, rang: 5},
  {name: 'ALTR', valides: 250, rang: 6},
  {name: 'ATI', valides: 230, rang: 7},
  {name: 'ATI', valides: 230, rang: 8},
  {name: 'JOPA', valides: 630, rang: 9},
  {name: 'ROIL', valides: 730, rang: 10},
  {name: 'LOLO', valides: 240, rang: 11},
  {name: 'POIM', valides: 230, rang: 12},
  {name: 'POIM', valides: 230, rang: 13},
];

const MyComponent = () => {
  const [page, setPage] = React.useState(2);
  const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);
  let totalpage = Math.ceil(partiarr.length / 6);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  const TableRower = ({meta}) => {
    return (
      <DataTable.Row
        style={{
          backgroundColor:
            Globals.PROFIL_INFO.user.username === meta.name
              ? '#ffeed6ff'
              : meta.rang % 3 === 0
              ? '#efeef2ff'
              : 'white',
        }}>
        <DataTable.Cell>
          <Text
            style={{
              fontWeight: '600',
            }}>
            {meta.name}
          </Text>
        </DataTable.Cell>
        <View style={{display: 'flex', flexDirection: 'row', width: '35%'}}>
          <DataTable.Cell numeric>{meta.valides}</DataTable.Cell>
          <DataTable.Cell numeric>{meta.rang} </DataTable.Cell>
        </View>
      </DataTable.Row>
    );
  };
  return (
    <ScrollView style={styles.main_container}>
      <ChallengeTop rang={3} participants={30} />
      <DataTable style={{paddingHorizontal: '10%'}}>
        <DataTable.Header
          style={{
            backgroundColor: 'white',
          }}>
          <DataTable.Title>Joueur</DataTable.Title>
          <View style={{display: 'flex', flexDirection: 'row', width: '35%'}}>
            <DataTable.Title numeric>Valides</DataTable.Title>
            <DataTable.Title numeric>Rang</DataTable.Title>
          </View>
        </DataTable.Header>
        <ScrollView style={styles.middle_container}>
          {partiarr.map((mes, i) => (
            <TableRower meta={mes} key={`joueur${i}`} />
          ))}
        </ScrollView>
      </DataTable>
      <ScrollView
        style={styles.main_scroller}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
        {Array.apply(null, Array(90)).map((mes, index) => {
          let ni = index + 1;
          return (
            <TouchableOpacity
              key={ni}
              style={[
                styles.unity_page,
                {
                  borderRadius: page === ni ? 15 : 8,
                  backgroundColor: page === ni ? '#e6e4eaff' : '#f7f7faff',
                },
              ]}
              mode="contained"
              onPress={e => {
                setPage(ni);
              }}>
              <Text>{ni}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </ScrollView>
  );
};

export default MyComponent;
