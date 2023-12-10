import React, { useEffect, useState } from 'react';
import {
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';

const AddTest = props => {
	const [patientDetails, setPatientDetails] = useState({
		name: '',
		value: '',
	});
	const [loading, setLoading] = useState(false);

	const handleSubmit = async () => {
		//check that all fields have data
		const shouldProceed = Object.values(patientDetails).every(
			value => value !== ''
		);

		if (shouldProceed) {
			setLoading(true);
			try {
				const response = await fetch('', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(patientDetails),
				});

				if (!response.ok) {
					setLoading(false);
				} else {
					await response.json();

					props.navigation.goBack();
				}
			} catch (error) {
				console.error('Error adding test:', error);
				setLoading(false);
			}
		} else {
		}
	};

	return (
		<ScrollView style={{ paddingTop: 20 }}>
			<ScrollView
				style={styles.form_wrapper}
				keyboardShouldPersistTaps='handled'
			>
				<View
					style={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'space-between',
					}}
				>
					<View style={{ width: '45%' }}>
						<Text>Name</Text>
						<TextInput
							style={styles.input}
							placeholder='Saroj Pranoj'
							testID='name'
							onChangeText={value =>
								setPatientDetails({ ...patientDetails, name: value })
							}
							value={patientDetails.name}
						/>
					</View>

					<View style={{ width: '45%' }}>
						<Text>Value</Text>
						<TextInput
							style={styles.input}
							placeholder='19'
							onChangeText={value =>
								setPatientDetails({ ...patientDetails, value })
							}
							value={patientDetails.age}
							keyboardType='numeric'
						/>
					</View>
				</View>

				<View style={styles.buttonContainer}>
					<TouchableOpacity
						onPress={() => handleSubmit()}
						style={styles.add_patient}
						disabled={loading}
					>
						<Text style={{ color: '#fff' }}>
							{loading ? 'Please wait...' : 'Add'}
						</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</ScrollView>
	);
};

export default AddTest;

const styles = StyleSheet.create({
	buttonContainer: {
		flex: 1,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		paddingBottom: 24,
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
	input: {
		height: 40,
		padding: 10,
		marginTop: 12,
		marginBottom: 24,
		borderRadius: 6,
		borderWidth: 2,
	},
	form_wrapper: {
		marginTop: 32,
		paddingHorizontal: 20,
	},
});
