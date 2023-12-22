import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { errorToast, successToast } from "../utils/toasts";
import { reset, getAllOrganizations } from "../features/organizations/orgSlice";
import { Card, CardBody, CardFooter, Typography, Button } from "@material-tailwind/react";

const CPDDashboard = () => {
	const dispatch = useDispatch();

	const { organizations, isLoading, isErrored, isSuccess, errorMessage } = useSelector((state) => state.org);

	// useEffect(() => console.log(organizations), [organizations]);

	// get all organizations
	useEffect(() => {
		dispatch(getAllOrganizations());
	}, [dispatch]);

	useEffect(() => {
		if (isErrored) errorToast(errorMessage);
		if (isSuccess) successToast("Organizations fetched successfully");
		dispatch(reset());
	}, [organizations, isErrored, isSuccess, errorMessage, dispatch]);

	const handleReadMore = (orgID) => {
		console.log(orgID);
	}

	if (isLoading) return <Spinner />;

  return (
    <div className="md:container mx-auto md:px-16 py-8">
		<div className="card-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
			{
				organizations.map((org, index) => {
					return (
						<Card key={index} className="">
							<CardBody>
								<Typography variant="h5" color="blue-gray" className="mb-2">
									{org.orgName}
								</Typography>
								<Typography className="line-clamp-3 md:line-clamp-4">
									{org.description}
								</Typography>
							</CardBody>
							<CardFooter className="pt-0">
								<Button value={org.orgID} onClick={e => handleReadMore(e.target.value)}>Read More</Button>
							</CardFooter>
						</Card>
					)
				})
			}
		</div>
	</div>
  )
}

export default CPDDashboard;
