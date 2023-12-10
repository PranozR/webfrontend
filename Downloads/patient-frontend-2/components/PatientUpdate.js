import React, { useState } from 'react';
import {
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';

const PatientUpdate = props => {
	const [patientDetails, setPatientDetails] = useState({
		name: props?.route?.params?.patient?.name || '',
		age: props?.route?.params?.patient?.age || '',
		email: props?.route?.params?.patient?.email || '',
		phone_number: props?.route?.params?.patient?.phone_number || '',
		house_address: props?.route?.params?.patient?.house_address || '',
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
				const response = await fetch(`/${props?.route?.params?.patient?._id}`, {
					method: 'PUT',
					body: JSON.stringify(patientDetails),
				});

				if (!response.ok) {
					setLoading(false);
				} else {
					await response.json();
					props.navigation.goBack();
				}
			} catch (error) {
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
						<Text>Age</Text>
						<TextInput
							style={styles.input}
							placeholder='19'
							onChangeText={value =>
								setPatientDetails({ ...patientDetails, age: value })
							}
							value={patientDetails.age}
							keyboardType='numeric'
						/>
					</View>
				</View>
				<View
					style={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'space-between',
					}}
				>
					<View style={{ width: '45%' }}>
						<Text>Email</Text>
						<TextInput
							style={styles.input}
							placeholder='sarojpranoj@gmail.com'
							testID='email'
							onChangeText={value =>
								setPatientDetails({ ...patientDetails, email: value })
							}
							value={patientDetails.email}
						/>
					</View>
					<View style={{ width: '45%' }}>
						<Text>Phone Number</Text>
						<TextInput
							keyboardType='phone-pad'
							style={styles.input}
							testID='phone'
							placeholder='838-453-1313'
							onChangeText={value =>
								setPatientDetails({ ...patientDetails, phone_number: value })
							}
							value={patientDetails.phone_number}
						/>
					</View>
				</View>
				<View>
					<Text>House Address</Text>
					<TextInput
						style={styles.input}
						placeholder='10, Indian Crescent'
						multiline
						testID='address'
						onChangeText={value =>
							setPatientDetails({ ...patientDetails, house_address: value })
						}
						value={patientDetails.house_address}
					/>
				</View>

				<View style={styles.buttonContainer}>
					<TouchableOpacity
						onPress={() => handleSubmit()}
						style={styles.add_patient}
						disabled={loading}
					>
						<Text style={{ color: '#fff' }}>
							{loading ? 'Please wait...' : 'Update'}
						</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</ScrollView>
	);
};

export default PatientUpdate;

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
