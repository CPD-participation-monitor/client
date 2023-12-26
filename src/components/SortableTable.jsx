import { useState, useMemo, useEffect } from 'react';
import { MagnifyingGlassIcon, ChevronUpDownIcon, ChevronDownIcon, ArrowRightEndOnRectangleIcon } from '@heroicons/react/24/outline';
import { Input, Typography, Button, Tabs, TabsHeader, Tab, IconButton, Tooltip, Card, CardHeader, CardBody, CardFooter, Menu, MenuHandler, MenuList, MenuItem, Chip, Checkbox } from '@material-tailwind/react';
import PropTypes from 'prop-types';


const SortableTable = ({ table_head, table_rows, tabs, tab_colors, title, description, actions, selectable, getSelectedRows }) => {

    SortableTable.propTypes = {
        table_head: PropTypes.array.isRequired,
        table_rows: PropTypes.array.isRequired,
        tabs: PropTypes.array,
        tab_colors: PropTypes.object,
        title: PropTypes.string,
        description: PropTypes.string,
        actions: PropTypes.arrayOf(
            PropTypes.shape({
                handler: PropTypes.func,
                tooltip: PropTypes.string,
            })
        ),
        selectable: PropTypes.bool,
        getSelectedRows: PropTypes.func, // a callback function to get the selected rows (should be required if selectable is true)
    };
    
    const [searchTerm, setSearchTerm] = useState('');
    const [sortField, setSortField] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [selectedTab, setSelectedTab] = useState('all');
    const [selectedRows, setSelectedRows] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    useEffect(() => {
        // check if getSelectedRows functions is passed as a prop
        if (getSelectedRows) getSelectedRows(selectedRows);
    }, [selectedRows, getSelectedRows]);

    const sortedRows = useMemo(() => {
        let sortableItems = [...table_rows];
        if (sortField !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortField] < b[sortField]) {
                    return sortDirection === 'asc' ? -1 : 1;
                }
                if (a[sortField] > b[sortField]) {
                    return sortDirection === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [table_rows, sortField, sortDirection]);

    // tabs part doesn't work yet
    const searchedRows = sortedRows.filter(row => 
        (selectedTab === 'all' || row.tab === selectedTab) &&
        Object.values(row).some(value => 
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = searchedRows.slice(indexOfFirstItem, indexOfLastItem);

    const handleSort = (field) => {
        setSortField(field);
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    }

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    }

    const handlePageChange = (direction) => {
        if (direction === 'previous' && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        } else if (direction === 'next' && currentPage < Math.ceil(searchedRows.length / itemsPerPage)) {
          setCurrentPage(currentPage + 1);
        }
    }

    const handleSelectRow = (row) => {
        setSelectedRows(prevSelectedRows => {
            if (prevSelectedRows.includes(row)) {
                return prevSelectedRows.filter(selectedRow => selectedRow !== row);
            } else {
                return [...prevSelectedRows, row];
            }
        });
    }

    const handleSelectAll = () => {
        setSelectAll(prevSelectAll => !prevSelectAll);
        if (!selectAll){
            setSelectedRows(currentItems);
        }
        else{
            setSelectedRows([]);
        }
    }

    return (
        <Card className='h-full w-full'>
            <CardHeader floated={false} shadow={false} className='rounded-none'>
                <div className="mb-8 flex items-center justify-between gap-8">
                    <div>
                        <Typography variant='h5' color='blue-gray'>
                            {title}
                        </Typography>
                        <Typography color='gray' className='mt-1 font-normal'>
                            {description}
                        </Typography>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                    {tabs ? <Tabs value={selectedTab} className="w-full md:w-max">
                        <TabsHeader>
                            {tabs.map(({ label, value }) => (
                                <Tab key={value} value={value} onClick={() => setSelectedTab(value)}>
                                    &nbsp;&nbsp;{label}&nbsp;&nbsp;
                                </Tab>
                            ))}
                        </TabsHeader>
                    </Tabs> : null}
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
            <CardBody className='overflow-scroll px-0'>
                <table className="mt-4 w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            {selectable && (
                                <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                                    <Checkbox 
                                        checked={selectedRows.length === currentItems.length}
                                        onChange={handleSelectAll}
                                    />
                                </th>
                            )}
                            {table_head.map((head, index) => (
                                <th key={head} className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50" onClick={() => handleSort(head.toLowerCase())}>
                                    <Typography variant='small' color='blue-gray' className='flex items-center justify-between gap-2 font-normal leading-none opacity-70'>
                                        {head}{" "}
                                        {index !== table_head.length - 1 && (
                                            <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                                        )}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((row, index) => {
                            const isLast = index === currentItems.length - 1;
                            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
                            return (
                                <tr key={index}>
                                    {selectable && (
                                        <td className={classes} key={index}>
                                            <Checkbox 
                                                checked={selectedRows.includes(row)}
                                                onChange={() => handleSelectRow(row)}
                                            />
                                        </td>
                                    )}
                                    {Object.keys(row).map(key => (
                                        <td className={classes} key={key}>
                                            {key !== 'tab' ? <Typography variant='paragraph' color='blue-gray' className='font-normal'>
                                                {row[key]}
                                            </Typography> : <div className='w-max'>
                                                <Chip
                                                    variant="ghost"
                                                    size="sm"
                                                    value={row[key]}
                                                    color={tab_colors[row[key]]}
                                                />
                                            </div>}
                                        </td>
                                    ))}
                                    {actions && actions.map((action, actionIndex) => (
                                        <td className={classes} key={actionIndex}>
                                            <Tooltip content={action.tooltip}>
                                                <IconButton variant='text' onClick={() => action.handler(row)}>
                                                    <ArrowRightEndOnRectangleIcon className="w-4 h-4" />
                                                </IconButton>
                                            </Tooltip>
                                        </td>
                                    ))}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </CardBody>
            <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                    Page {currentPage} of {Math.ceil(searchedRows.length / itemsPerPage)}
                </Typography>
                <div className="flex gap-2">
                    <Menu>
                        <MenuHandler>
                            <Button className='flex items-center'>{itemsPerPage}<ChevronDownIcon className='h-3 w-3 ml-2' /></Button>
                        </MenuHandler>
                        <MenuList>
                            <MenuItem value={5} onClick={e => setItemsPerPage(e.target.value)}>5</MenuItem>
                            <MenuItem value={10} onClick={e => setItemsPerPage(e.target.value)}>10</MenuItem>
                            <MenuItem value={15} onClick={e => setItemsPerPage(e.target.value)}>15</MenuItem>
                        </MenuList>
                    </Menu>
                    <Button variant="outlined" size="sm" onClick={() => handlePageChange('previous')}>
                        Previous
                    </Button>
                    <Button variant="outlined" size="sm" onClick={() => handlePageChange('next')}>
                        Next
                    </Button>
                </div>
            </CardFooter>
        </Card>
    )
}

export default SortableTable;