import { Drawer, Typography, IconButton, List, ListItem, ListItemPrefix, ListItemSuffix, Chip } from "@material-tailwind/react";
import PropTypes from "prop-types";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { PresentationChartLineIcon, BellIcon, UserGroupIcon, CalendarDaysIcon, Cog8ToothIcon } from "@heroicons/react/24/solid";

const OrgDashboardDrawer = ({ drawerOpen, closeDrawer, setCurrentComponent }) => {

	OrgDashboardDrawer.propTypes = {
		drawerOpen: PropTypes.bool.isRequired,
		closeDrawer: PropTypes.func.isRequired,
		setCurrentComponent: PropTypes.func.isRequired
	};

  return (
    <Drawer open={drawerOpen} onClose={closeDrawer}>
			<div className="mb-2 flex items-center justify-between p-4">
				<Typography variant="h5" color="blue-gray">
					Organization Dashboard
				</Typography>
				<IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
					<XMarkIcon className="w-5 h-5" />
				</IconButton>
			</div>
			<List>
				<ListItem onClick={() => setCurrentComponent('dashboard')}>
					<ListItemPrefix><PresentationChartLineIcon className="w-4 h-4" /></ListItemPrefix>
					Dashboard
				</ListItem>
				<ListItem>
					<ListItemPrefix><BellIcon className="w-4 h-4" /></ListItemPrefix>
					Notification
					<ListItemSuffix>
						<Chip
							value="2"
							size="sm"
							color="red"
							className="rounded-full"	
						/>
					</ListItemSuffix>
				</ListItem>
				<ListItem onClick={() => setCurrentComponent('members')}>
					<ListItemPrefix><UserGroupIcon className="w-4 h-4" /></ListItemPrefix>
					Members
				</ListItem>
				<ListItem onClick={() => setCurrentComponent('events')}>
					<ListItemPrefix><CalendarDaysIcon className="w-4 h-4" /></ListItemPrefix>
					Events
				</ListItem>
				<ListItem className="border-t-2 mt-8" onClick={() => setCurrentComponent('settings')}>
					<ListItemPrefix><Cog8ToothIcon className="w-4 h-4" /></ListItemPrefix>
					Settings
				</ListItem>
			</List>
		</Drawer>
  )
}

export default OrgDashboardDrawer;