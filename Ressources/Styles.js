import {StyleSheet, Dimensions} from 'react-native';
import Globals from '../Ressources/Globals';
//fontFamily?: string | undefined | 'Helvetica' | 'Montserrat' | 'Neogrotesk' | 'Ubuntu' ;

const {width, height} = Dimensions.get('screen');
const mobile_360_750 = true;
const mobile_500_1000 = width <= 500 && height <= 1000;

let tyleSignIn, tyleRecorder, tyleDashBoard;

if (mobile_360_750) {
  tyleSignIn = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'column',
      backgroundColor: Globals.COLORS.white,
    },
    titleText: {
      fontSize: 50,
      marginBottom: 10,
      color: Globals.COLORS.blue_dark,
      width: '100%',
      textAlign: 'center',
      fontFamily: 'Neogrotesk',
    },
    loginButtonLabel: {
      fontSize: 22,
    },
    navButtonText: {
      fontSize: 16,
    },
    boldText_touchable: {
      fontWeight: 'bold',
      color: Globals.COLORS.white,
      fontSize: 18,
    },
    boldText: {
      color: Globals.COLORS.secondary,
      fontSize: 16,
      marginVertical: 16,
      fontWeight: 'bold',
    },
    simple_text: {
      textAlign: 'center',
      color: Globals.COLORS.arsenic2,
    },
    Image_style: {
      height: 50,
      width: 200,
      zIndex: 41,
    },
    center_container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
    },
    input_container: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    center_scroll: {
      width: '100%',
    },
    bottom_container: {
      alignItems: 'center',
      justifyContent: 'space-around',
      width: '100%',
      height: '10%',
    },
    text_input: {
      marginTop: 10,
      marginBottom: 10,
      width: width / 1.1,
      height: height / 13,
      elevation: 20,
    },
    buts_style: {
      width: 200,
      backgroundColor: Globals.COLORS.primary,
      marginTop: 15,
      borderRadius: 70,
      justifyContent: 'center',
      alignItems: 'center',
      height: 50,
    },
    input: {
      width: '90%',
      height: 50,
      elevation: 6,
      padding: 10,
      color: Globals.COLORS.black,
      backgroundColor: Globals.COLORS.white,
      marginTop: 4,
    },
    wrong_login_container: {
      bottom: 5,
      width: '80%',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      borderTopWidth: 2,
      borderTopColor: Globals.COLORS.red,
    },
    wrong_login_found_text: {
      color: Globals.COLORS.red,
      fontWeight: 'bold',
      fontSize: 14,
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
    },
    indicator: {},
    media_unity: {
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 5,
      backgroundColor: Globals.COLORS.white,
      height: 40,
      width: 70,
      marginHorizontal: 12,
    },
    media_container: {flexDirection: 'row', margin: 50},
  });
  tyleDashBoard = StyleSheet.create({
    main_container: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: Globals.COLORS.white,
    },
    top_container: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      justifyContent: 'space-between',
      margin: 10,
    },
    image: {
      borderRadius: 50,
      height: 100,
      width: '30%',
      padding: 4,
    },
    action_button: {
      borderRadius: 50,
      height: 100,
      width: '30%',
      padding: 4,
    },
    middle_container: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    middle_fields_container: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    midle_prop_title: {
      fontWeight: 'bold',
      fontSize: 18,
    },
    midle_prop_value: {
      fontWeight: '700',
      color: Globals.COLORS.arsenic,
      fontSize: 14,
    },
    loginButtonLabel: {
      fontWeight: 'bold',
      color: Globals.COLORS.primary_pure,
      fontSize: 16,
    },
  });
  tyleRecorder = StyleSheet.create({
    main_container: {
      display: 'flex',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Globals.COLORS.white,
    },
    top_container: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      justifyContent: 'space-between',
      margin: 10,
    },
    image: {
      borderRadius: 50,
      height: 100,
      width: '30%',
      padding: 4,
    },
    pass_button: {
      borderRadius: 50,
      height: 100,
      width: '100%',
      padding: 4,
    },
    middle_container: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    middle_fields_container: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    midle_prop_title: {
      fontWeight: 'bold',
      fontSize: 18,
    },
    midle_prop_value: {
      fontWeight: '700',
      color: Globals.COLORS.arsenic,
      fontSize: 14,
    },
    loginButtonLabel: {
      fontWeight: 'bold',
      color: Globals.COLORS.primary_pure,
      fontSize: 16,
    },
  });
} else if (mobile_500_1000) {
  tyleSignIn = StyleSheet.create({
    wrapper: {},
  });
}
export const styleSignIn = tyleSignIn,
  styleDashBoard = tyleDashBoard,
  styleRecorder = tyleRecorder;
