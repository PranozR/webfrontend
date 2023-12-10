import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import PatientTests from './PatientTests';

const ViewPatient = ({ route, navigation }) => {
	const [loading, setLoading] = useState(false);
	const [patient, setPatient] = useState(null);
	const [fetchPatientloading, setFetchPatientLoading] = useState(false);
    

	//Method to fetch patient details
	const getPatient = async id => {
		setFetchPatientLoading(true);
		await fetch(`/patients/${id}`)
			.then(response => response.json())
			.then(json => {
				setPatient(json);
				setTimeout(() => {
					setFetchPatientLoading(false);
				}, 1500);
			})
			.catch(error => {
				setFetchPatientLoading(false);
			});
	};

	const refetchPatients = () => {
		getPatient(route.params.patient?._id);
	};

	useFocusEffect(
		useCallback(() => {
			if (route.params.patient?._id) {
				// get patient
				getPatient(route.params.patient?._id);
			}
		}, [route.params.patient?._id])
	);

	const deletePatient = async () => {
		try {
			const response = await fetch(`patients/${patient?._id}`, {
				method: 'DELETE',
			});

			if (!response.ok) {
			} else {
				await response.json();
				navigation.goBack();
			}
		} catch (error) {
			console.error('Error deleting patient:', error);
		}
	};

	return (
		<>
			<View style={{ padding: 20 }}>
				<View
					style={[
						styles.profile_header,
						{
							display: 'flex',
							justifyContent: 'space-between',
							flexDirection: 'row',
						},
					]}
				>
					<View
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							flexDirection: 'row',
						}}
					>
						<View style={styles.change_patient_details_wrapper}>
							<Text
								style={{
									fontWeight: 'bold',
									fontSize: 18,
									textTransform: 'capitalize',
								}}
							>
								{/* {patient?.first_name} {patient?.last_name} */}
								Saroj Pranoj (critical)
							</Text>
							<View
								style={{
									display: 'flex',
									flexDirection: 'row',
									marginTop: 12,
									alignItems: 'center',
								}}
							>
								<Text style={{ fontSize: 14, color: '#68696A' }}>
									Age - 24 years old
								</Text>
							</View>
							<View
								style={{
									display: 'flex',
									flexDirection: 'row',
									marginTop: 12,
									alignItems: 'center',
								}}
							>
								<Text style={{ fontSize: 14, color: '#68696A' }}>
									Email - saroj@gmail.com
								</Text>
							</View>
							<View
								style={{
									display: 'flex',
									flexDirection: 'row',
									marginTop: 12,
									alignItems: 'center',
								}}
							>
								<Text style={{ fontSize: 14, color: '#68696A' }}>
									Phone - 637-987-9282
								</Text>
							</View>
							<View
								style={{
									display: 'flex',
									flexDirection: 'row',
									marginTop: 12,
									alignItems: 'center',
								}}
							>
								<Text style={{ fontSize: 14, color: '#68696A' }}>
									Address - 2, Colmbian Way
								</Text>
							</View>
						</View>
					</View>
					<View>
						<View
							style={{
								display: 'flex',
								flexDirection: 'row',
								alignItems: 'center',
							}}
						>
							<TouchableOpacity onPress={() => deletePatient()}>
								<Text style={{ textDecorationLine: 'underline' }}>Delete</Text>
							</TouchableOpacity>
						</View>
						<View
							style={{
								display: 'flex',
								flexDirection: 'row',
								alignItems: 'center',
								marginTop: 8,
							}}
						>
							<TouchableOpacity
								onPress={() =>
									navigation.navigate('PatientUpdate', {
										patient: patient,
									})
								}
							>
								<Text style={{ textDecorationLine: 'underline' }}>Edit</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
				<View
					style={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
						marginTop: 40,
					}}
				>
					<Text
						style={{
							fontWeight: 'bold',
							fontSize: 18,
							textTransform: 'capitalize',
							textDecorationLine: 'underline',
						}}
					>
						Tests
					</Text>
					<TouchableOpacity
						onPress={() =>
							navigation.navigate('AddTest', {
								patient: patient,
							})
						}
						style={styles.add_patient}
					>
						<Text style={{ color: '#fff' }}>Add Test</Text>
					</TouchableOpacity>
				</View>
				<PatientTests />
			</View>
		</>
	);
};

export default ViewPatient;

const styles = StyleSheet.create({
	add_patient: {
		// flex: 1,
		// height: 44,
		paddingHorizontal: 16,
		paddingVertical: 14,
		backgroundColor: '#000',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	loader: {
		justifyContent: 'center',
		alignItems: 'center',
		display: 'flex',
		paddingTop: 100,
	},
	profile_header: {
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'row',
	},
	change_patient_details_wrapper: {
		display: 'flex',
		marginLeft: 8,
	},
});
