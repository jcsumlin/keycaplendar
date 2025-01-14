import React, { useContext, useState } from "react";
import classNames from "classnames";
import { DeviceContext, UserContext } from "../../util/contexts";
import { Preset, Keyset } from "../../util/constructors";
import { openModal, closeModal } from "../../util/functions";
import { MainWhitelistType, PresetType, QueueType, SetType, SortOrderType } from "../../util/types";
import { Fab } from "@rmwc/fab";
import { DrawerAppContent } from "@rmwc/drawer";
import { TopAppBarFixedAdjust } from "@rmwc/top-app-bar";
import { ContentGrid } from "./ContentGrid";
import { ContentEmpty } from "./ContentEmpty";
import { AppBar } from "../main/app_bar/AppBar";
import { DrawerDetails } from "../main/DrawerDetails";
import { DrawerFilter } from "../main/DrawerFilter";
import { DialogSales } from "../main/DialogSales";
import { DrawerFilterPreset } from "../main/DrawerFilterPreset";
import { DialogFilterPreset } from "../main/DialogFilterPreset";
import { DialogDeleteFilterPreset } from "../main/DialogDeleteFilterPreset";
import { DrawerCreate, DrawerEdit } from "../main/admin/DrawerEntry";
import { DialogCreate, DialogEdit } from "../main/admin/DialogEntry";
import { DialogDelete } from "../main/admin/DialogDelete";
import { SnackbarDeleted } from "../main/admin/SnackbarDeleted";
import { Footer } from "../common/Footer";
import ConditionalWrapper, { BoolWrapper } from "../util/ConditionalWrapper";

type ContentMainProps = {
  bottomNav: boolean;
  navOpen: boolean;
  openNav: () => void;
  page: string;
  content: boolean;
  groups: string[];
  sets: SetType[];
  sort: string;
  setSort: (sort: string) => void;
  sortOrder: SortOrderType;
  setSortOrder: (sortOrder: SortOrderType) => void;
  view: string;
  setView: (view: string) => void;
  search: string;
  setSearch: (search: string) => void;
  toggleLichTheme: () => void;
  profiles: string[];
  allDesigners: string[];
  allVendors: string[];
  allRegions: string[];
  setWhitelist: (prop: string, whitelist: MainWhitelistType | MainWhitelistType[keyof MainWhitelistType]) => void;
  whitelist: MainWhitelistType;
  snackbarQueue: QueueType;
  loading: boolean;
  getData: () => void;
};

export const ContentMain = (props: ContentMainProps) => {
  const { user } = useContext(UserContext);
  const device = useContext(DeviceContext);
  const blankSet = new Keyset();
  const blankPreset = new Preset();

  const [filterOpen, setFilterOpen] = useState(false);
  const openFilter = () => {
    const open = () => {
      if (filterOpen && device === "desktop") {
        closeFilter();
      } else {
        if (device !== "desktop" || props.view === "compact") {
          openModal();
        }
        setFilterOpen(true);
      }
    };
    if (detailsOpen) {
      closeDetails();
      setTimeout(() => open(), 300);
    } else {
      open();
    }
  };
  const closeFilter = () => {
    closeModal();
    setFilterOpen(false);
  };

  const [detailsOpen, setDetailsOpen] = useState(false);
  const [detailSet, setDetailSet] = useState(blankSet);
  const openDetails = (set: SetType) => {
    const open = () => {
      if (device !== "desktop" || props.view === "compact") {
        openModal();
      }
      setDetailsOpen(true);
      setDetailSet(set);
    };
    if (filterOpen) {
      closeFilter();
      setTimeout(() => open(), 300);
    } else {
      open();
    }
  };
  const closeDetails = () => {
    closeModal();
    setDetailsOpen(false);
    setTimeout(() => setDetailSet(blankSet), 300);
  };

  const [salesOpen, setSalesOpen] = useState(false);
  const [salesSet, setSalesSet] = useState(blankSet);
  const openSales = (set: SetType) => {
    setSalesOpen(true);
    setSalesSet(set);
  };
  const closeSales = () => {
    setSalesOpen(false);
    setTimeout(() => setSalesSet(blankSet), 300);
  };

  const [createOpen, setCreateOpen] = useState(false);
  const openCreate = () => {
    openModal();
    setCreateOpen(true);
  };
  const closeCreate = () => {
    closeModal();
    setCreateOpen(false);
  };

  const [editOpen, setEditOpen] = useState(false);
  const [editSet, setEditSet] = useState(blankSet);
  const openEdit = (set: SetType) => {
    openModal();
    setEditOpen(true);
    setEditSet(set);
  };
  const closeEdit = () => {
    closeModal();
    setEditOpen(false);
    setTimeout(() => setEditSet(blankSet), 300);
  };

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteSnackbarOpen, setDeleteSnackbarOpen] = useState(false);
  const [deleteSet, setDeleteSet] = useState(blankSet);
  const openDeleteDialog = (set: SetType) => {
    closeDetails();
    setDeleteDialogOpen(true);
    setDeleteSet(set);
  };
  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  const openDeleteSnackbar = () => {
    setDeleteSnackbarOpen(true);
  };

  const closeDeleteSnackbar = () => {
    setDeleteSnackbarOpen(false);
    setTimeout(() => setDeleteSet(blankSet), 300);
  };

  const [filterPresetOpen, setFilterPresetOpen] = useState(false);
  const [filterPreset, setFilterPreset] = useState(blankPreset);
  const openFilterPreset = (preset: PresetType) => {
    const open = () => {
      openModal();
      setFilterPresetOpen(true);
      setFilterPreset(preset);
    };
    if (filterOpen && (props.view === "compact" || device !== "desktop")) {
      closeFilter();
      setTimeout(() => open(), 300);
    } else {
      open();
    }
  };
  const closeFilterPreset = () => {
    closeModal();
    setFilterPresetOpen(false);
    setTimeout(() => setFilterPreset(blankPreset), 300);
  };

  const [deleteFilterPresetOpen, setDeleteFilterPresetOpen] = useState(false);
  const [deleteFilterPreset, setDeleteFilterPreset] = useState(blankPreset);
  const openDeleteFilterPreset = (preset: PresetType) => {
    const open = () => {
      openModal();
      setDeleteFilterPresetOpen(true);
      setDeleteFilterPreset(preset);
    };
    if (filterOpen && (props.view === "compact" || device !== "desktop")) {
      closeFilter();
      setTimeout(() => open(), 300);
    } else {
      open();
    }
  };
  const closeDeleteFilterPreset = () => {
    closeModal();
    setDeleteFilterPresetOpen(false);
    setTimeout(() => setDeleteFilterPreset(blankPreset), 300);
  };

  const filterPresetElements = user.email ? (
    <>
      {device !== "mobile" ? (
        <DrawerFilterPreset open={filterPresetOpen} close={closeFilterPreset} preset={filterPreset} />
      ) : (
        <DialogFilterPreset open={filterPresetOpen} close={closeFilterPreset} preset={filterPreset} />
      )}
      <DialogDeleteFilterPreset
        open={deleteFilterPresetOpen}
        close={closeDeleteFilterPreset}
        preset={deleteFilterPreset}
      />
    </>
  ) : null;

  const deleteElements = user.isEditor ? (
    <>
      <DialogDelete
        open={deleteDialogOpen}
        close={closeDeleteDialog}
        set={deleteSet}
        openSnackbar={openDeleteSnackbar}
        getData={props.getData}
        snackbarQueue={props.snackbarQueue}
      />
      <SnackbarDeleted
        open={deleteSnackbarOpen}
        close={closeDeleteSnackbar}
        set={deleteSet}
        getData={props.getData}
        snackbarQueue={props.snackbarQueue}
      />
    </>
  ) : null;

  const editorElements =
    user.isEditor || user.isDesigner ? (
      <ConditionalWrapper
        condition={device === "desktop"}
        wrapper={(children) => <div className="editor-elements">{children}</div>}
      >
        <Fab
          className={classNames("create-fab", { middle: props.bottomNav })}
          icon="add"
          label={device === "desktop" ? "Create" : null}
          onClick={openCreate}
        />
        {device !== "mobile" ? (
          <>
            <DrawerCreate
              open={createOpen}
              close={closeCreate}
              profiles={props.profiles}
              allDesigners={props.allDesigners}
              allVendors={props.allVendors}
              allRegions={props.allRegions}
              getData={props.getData}
              snackbarQueue={props.snackbarQueue}
            />
            <DrawerEdit
              open={editOpen}
              close={closeEdit}
              profiles={props.profiles}
              allDesigners={props.allDesigners}
              allVendors={props.allVendors}
              allRegions={props.allRegions}
              set={editSet}
              getData={props.getData}
              snackbarQueue={props.snackbarQueue}
            />
          </>
        ) : (
          <>
            <DialogCreate
              open={createOpen}
              close={closeCreate}
              profiles={props.profiles}
              allDesigners={props.allDesigners}
              allVendors={props.allVendors}
              allRegions={props.allRegions}
              getData={props.getData}
              snackbarQueue={props.snackbarQueue}
            />
            <DialogEdit
              open={editOpen}
              close={closeEdit}
              profiles={props.profiles}
              allDesigners={props.allDesigners}
              allVendors={props.allVendors}
              allRegions={props.allRegions}
              set={editSet}
              getData={props.getData}
              snackbarQueue={props.snackbarQueue}
            />
          </>
        )}
        {deleteElements}
      </ConditionalWrapper>
    ) : null;

  const content = props.content ? (
    <ContentGrid
      groups={props.groups}
      sets={props.sets}
      sort={props.sort}
      sortOrder={props.sortOrder}
      page={props.page}
      view={props.view}
      details={openDetails}
      closeDetails={closeDetails}
      detailSet={detailSet}
      edit={openEdit}
    />
  ) : (
    <ContentEmpty page={props.page} />
  );
  const drawerOpen = (detailsOpen || filterOpen) && device === "desktop";
  const wrapperClasses = classNames("main", props.view, {
    "extended-app-bar": props.view === "card" && !props.bottomNav,
    "drawer-open": drawerOpen,
  });
  return (
    <>
      <AppBar
        openNav={props.openNav}
        bottomNav={props.bottomNav}
        indent={user.isDesigner || user.isEditor}
        page={props.page}
        view={props.view}
        setView={props.setView}
        sort={props.sort}
        setSort={props.setSort}
        sortOrder={props.sortOrder}
        setSortOrder={props.setSortOrder}
        search={props.search}
        setSearch={props.setSearch}
        sets={props.sets}
        loading={props.loading}
        openFilter={openFilter}
      />
      {props.bottomNav ? null : <TopAppBarFixedAdjust />}
      <div className="content-container">
        <DrawerFilter
          view={props.view}
          profiles={props.profiles}
          vendors={props.allVendors}
          open={filterOpen}
          close={closeFilter}
          setWhitelist={props.setWhitelist}
          whitelist={props.whitelist}
          snackbarQueue={props.snackbarQueue}
          openPreset={openFilterPreset}
          deletePreset={openDeleteFilterPreset}
          sort={props.sort}
        />
        <DrawerDetails
          view={props.view}
          set={detailSet}
          open={detailsOpen}
          close={closeDetails}
          edit={openEdit}
          delete={openDeleteDialog}
          search={props.search}
          setSearch={props.setSearch}
          toggleLichTheme={props.toggleLichTheme}
          openSales={openSales}
          device={device}
        />
        <BoolWrapper
          condition={device === "desktop"}
          trueWrapper={(children) => <DrawerAppContent className={wrapperClasses}>{children}</DrawerAppContent>}
          falseWrapper={(children) => <div className={wrapperClasses}>{children}</div>}
        >
          {content}
          <Footer />
        </BoolWrapper>
        <DialogSales open={salesOpen} close={closeSales} set={salesSet} />
        {filterPresetElements}
        {editorElements}
      </div>
      {props.bottomNav ? <TopAppBarFixedAdjust /> : null}
    </>
  );
};
