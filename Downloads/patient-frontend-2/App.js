import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PatientsLists from './components/PatientLists';
import AddPatient from './components/AddPatient';
import ViewPatient from './components/ViewPatient';
import PatientUpdate from './components/PatientUpdate';
import AddTest from './components/AddTest';

export default function App() {
	const Stack = createNativeStackNavigator();

	return (
		<View style={styles.container}>
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen name='Patients Lists' component={PatientsLists} />
					<Stack.Screen name='AddPatient' component={AddPatient} />
					<Stack.Screen name='PatientUpdate' component={PatientUpdate} />
					<Stack.Screen name='ViewPatient' component={ViewPatient} />
					<Stack.Screen name='AddTest' component={AddTest} />
				</Stack.Navigator>
			</NavigationContainer>
			<Text>Oky</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 100,
	},
});
