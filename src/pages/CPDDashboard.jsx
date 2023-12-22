import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { errorToast, successToast } from "../utils/toasts";
import { reset, getAllOrganizations } from "../features/organizations/orgSlice";

const CPDDashboard = () => {
	const dispatch = useDispatch();

	const { organizations, isLoading, isErrored, isSuccess, errorMessage } = useSelector((state) => state.org);

	useEffect(() => {
		dispatch(getAllOrganizations());
	}, [dispatch]);

	// get all organizations
	useEffect(() => {
	
	if (isErrored) {
			errorToast(errorMessage);
	}

	if (isSuccess) {
			successToast("Organizations fetched successfully");
	}

	dispatch(reset());
	}, [organizations, isErrored, isSuccess, errorMessage, dispatch]);

  return (
    <div>CPDDashboard</div>
  )
}

export default CPDDashboard;
