import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { errorToast, successToast } from "../utils/toasts";
import { reset, getAllOrganizations } from "../features/organizations/orgSlice";
import { Card, CardHeader, CardBody, CardFooter, Typography, Button, Input } from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ORG_DASHBOARD_ROUTE } from "../utils/routes";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

const CPDDashboard = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [searchTerm, setSearchTerm] = useState('');

	const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    }

	const { organizations, isLoading, isErrored, isSuccess, errorMessage } = useSelector((state) => state.org);
	
	// just filter by name for now
    const filteredOrgs = organizations.filter((org) => {
        return org?.orgName.toLowerCase().includes(searchTerm.toLowerCase());
    });

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
		navigate(ORG_DASHBOARD_ROUTE.replace(":orgID", orgID));
	}

	if (isLoading) return <Spinner />;

  return (
    <div className="md:container mx-auto md:px-16 py-8">
		<div className="mb-8">
			<CardHeader floated={false} shadow={false} className='rounded-none'>
                <div className="mb-8 flex items-center justify-between gap-8">
                    <div>
                        <Typography variant='h5' color='blue-gray'>
                            CPD Providers
                        </Typography>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                    <div className="w-full md:w-72">
                        <Input
                            label="Search"
                            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </div>
                </div>
            </CardHeader>
		</div>
		<div className="card-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
			{
				filteredOrgs.map((org, index) => {
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
