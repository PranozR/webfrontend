import React, { useCallback, useState } from 'react';
import {
	Text,
	View,
	StyleSheet,
	FlatList,
	ActivityIndicator,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const PatientTests = ({ patient }) => {
	const data = [
		{
			_id: 1,
			name: 'Cancer Test',
		},
		{
			_id: 2,
			name: 'Eye Test',
		},
		{
			_id: 3,
			name: 'Ear Test',
		},
	];

	const [loading, setLoading] = useState(false);
	const [allTests, setAllTests] = useState(data);
	// const [allTests, setAllTests] = useState([]);

	//Method to fetch patient tests
	const fetchPatientTests = async id => {
		setLoading(true);
		await fetch(`/tests`)
			.then(response => response.json())
			.then(json => {
				setAllTests(json);
				setTimeout(() => {
					setLoading(false);
				}, 1500);
			})
			.catch(error => {
				setLoading(false);
			});
	};

	const manualRefetch = () => {
		fetchPatientTests(patient?._id);
	};

	useFocusEffect(
		useCallback(() => {
			if (patient?._id) {
				// fetchPatientTests(patient?._id);
			}
		}, [patient?._id])
	);

	const renderItem = data => (
		<View style={styles.wrapper}>
			<View>
				<Text style={styles.title}>{data?.item?.name}</Text>
			</View>
		</View>
	);

	return (
		<View>
			<View style={{ position: 'relative' }}>
				{!loading && allTests?.length === 0 ? (
					<Text>No tests</Text>
				) : loading ? (
					<View style={styles.loader}>
						<ActivityIndicator size='small' />
						<Text style={{ marginTop: 12 }}>Loading...</Text>
					</View>
				) : (
					<FlatList
						data={allTests}
						renderItem={patient => renderItem(patient)}
						keyExtractor={patient => patient._id}
					/>
				)}
			</View>
		</View>
	);
};

export default PatientTests;

const styles = StyleSheet.create({
	loader: {
		justifyContent: 'center',
		alignItems: 'center',
		display: 'flex',
		paddingTop: 100,
	},
	wrapper: {
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'row',
		marginVertical: 16,
		borderColor: 'lightgray',
		borderWidth: 1,
		padding: 10,
	},
	title: {
		fontSize: 14,
		color: '#232324',
		fontWeight: 'bold',
		marginBottom: 4,
	},
});
