import React, { useState, useCallback } from 'react';
import {
	ActivityIndicator,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import ListPatients from './ListPatients';

const PatientLists = props => {
	const data = [
		{
			_id: 1,
			name: 'Saroj Pranoj',
			condition: 'critical',
		},
		{
			_id: 2,
			name: 'Saroj Pranoj',
			condition: 'critical',
		},
		{
			_id: 3,
			name: 'Saroj Pranoj',
			condition: 'critical',
		},
	];

	const [patients, setPatients] = useState(data);
	// const [patients, setPatients] = useState([]);
	const [loading, setLoading] = useState(false);

	const getPatients = async () => {
		await fetch('')
			.then(response => response.json())
			.then(json => {
				setPatients(json);
				setTimeout(() => {
					setLoading(false);
				}, 1500);
			})
			.catch(error => {
				setLoading(false);
			});
	};

	useFocusEffect(
		useCallback(() => {
			// getPatients();
		}, [])
	);

	return (
		<View style={styles.wrapper}>
			<View style={styles.btn_container}>
				<TouchableOpacity
					onPress={() => props.navigation.navigate('AddPatient')}
					style={styles.add_patient}
				>
					<Text style={{ color: '#fff' }}>Add Patient</Text>
				</TouchableOpacity>
			</View>

			<View style={{ paddingHorizontal: 20 }}>
				{!loading && patients?.length === 0 ? (
					<Text style={{ margin: 20 }}>No patient added</Text>
				) : loading ? (
					<View style={styles.loader}>
						<ActivityIndicator size='small' />
					</View>
				) : (
					<ListPatients allPatients={patients} navigationProps={props} />
				)}
			</View>
		</View>
	);
};

export default PatientLists;

const styles = StyleSheet.create({
	loader: {
		justifyContent: 'center',
		alignItems: 'center',
		display: 'flex',
		paddingTop: 100,
	},
	btn_container: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		bottom: 0,
		width: '100%',
		height: 40,
	},
	add_patient: {
		width: '90%',
		flex: 1,
		height: 44,
		paddingHorizontal: 16,
		paddingVertical: 14,
		backgroundColor: '#000',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	wrapper: {
		backgroundColor: '#fff',
		flex: 1,
		position: 'relative',
	},
});
