import React, { useState, useEffect, useRef } from 'react';

import type { DataStorage } from 'types/Storage';
import type { RideHistoryResponse } from 'types/RideHistoryResponse';

import { convertedData } from 'manipulate';
import { getErrorMessage } from 'utils/messages';
import { getSingleRidePage } from 'api';
import constants from 'utils/constants';
import { convertToLastVersion, getLastVersionNumber } from 'manipulate/convert';

import Result from 'containers/Result';
import CarAnimation from 'components/CarAnimation';
import Footer from 'components/Footer';
import Input from 'components/Input/Input';
import Link from 'components/Link';
import styles from './SnappExtension.module.css';

const SnappExtension = () => {
  const [accessToken, setAccessToken] = useState<string>('');
  const [dataInStorage, setDataInStorage] = useState<DataStorage | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [page, setPage] = useState<number>(0);

  const pendingTimer = useRef<NodeJS.Timeout>();

  // set Snapp access token
  useEffect(() => {
    chrome.storage.local.get('accessToken', ({ accessToken }) => {
      setAccessToken(accessToken);
    });
    chrome.storage.local.get('result', ({ result }) => {
      setDataInStorage(result);
    });
    chrome.storage.local.get('mapboxToken', ({ mapboxToken }) => {
      setMapboxToken(mapboxToken || '');
    });

    // clean-up
    return () => {
      if (pendingTimer.current) {
        clearTimeout(pendingTimer.current);
      }
    };
  }, []);

  // fetch data from Snapp API
  const getAllRides = async (
    accessToken: string
  ): Promise<RideHistoryResponse[]> => {
    let page = 1;
    setPage(page);
    let rides = await getSingleRidePage(accessToken, page++);
    let response = [...rides];

    while (rides.length > 0) {
      response = [...response, ...rides];
      setPage(page);
      rides = await getSingleRidePage(accessToken, page++);
    }
    return response;
  };

  const prepareRidesData = async (accessToken: string) => {
    try {
      const response = await getAllRides(accessToken);
      const [lastRide] = response;
      const rides = convertedData(response);

      handleShowResult(
        {
          rides,
          meta: {
            lastRideId: lastRide.human_readable_id,
            version: getLastVersionNumber(),
            forceUpdate: false,
          },
        },
        true
      );
    } catch (e) {
      const error =
        getErrorMessage[(e as Error).message] || constants.somethingWentWrong;
      setError(error);
      setIsLoading(false);
      return;
    }
    setIsFetching(false);
  };

  const handleGetRidesHistory = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setIsLoading(true);
    if (e.target instanceof HTMLElement) {
      const accessToken = e.target.dataset.accessToken as string;

      if (dataInStorage) {
        const { meta, rides } = convertToLastVersion(dataInStorage);
        if (meta.forceUpdate) {
          prepareRidesData(accessToken);
        } else {
          // get last ride
          const [lastRide] = await getSingleRidePage(accessToken, 1);
          setPage(1);
          const isUpdated = lastRide.human_readable_id === meta.lastRideId;
          if (isUpdated) {
            handleShowResult({ rides, meta }, false);
          } else {
            // TODO: get new rides
          }
        }
      } else {
        prepareRidesData(accessToken);
      }
    }
  };

  const handleShowResult = (result: DataStorage, withLoading: boolean) => {
    chrome.storage.local.set({ result }, () => {
      if (withLoading) {
        pendingTimer.current = setTimeout(() => {
          setIsLoading(false);
          handleOpenNewTab();
        }, 3000);
      } else {
        handleOpenNewTab();
      }
    });
  };

  const handleOpenNewTab = () => {
    chrome.tabs.create({
      url: chrome.extension.getURL('popup/index.html#result'),
    });
  };

  const handleChangeMapboxToken = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMapboxToken(e.target.value);
    chrome.storage.local.set({ mapboxToken: e.target.value });
  };

  if (window.location.href.includes('#result')) {
    if (dataInStorage) {
      return <Result rides={dataInStorage.rides} mapboxToken={mapboxToken} />;
    }
    return <div className={styles.loadData}>{constants.loadData}</div>;
  }

  if (isLoading) {
    return <CarAnimation isFetching={isFetching} speed={page} />;
  }

  return (
    <main className={styles.extension}>
      <div className={styles.actions}>
        {accessToken && !error ? (
          <>
            <span className={styles.hint}>{constants.mapboxHint}</span>
            <Input
              autoComplete="off"
              icon="token"
              id="mapbox"
              onChange={handleChangeMapboxToken}
              placeholder={constants.mapboxTokenPlaceholder}
              type="text"
              value={mapboxToken}
            />
            {mapboxToken ? (
              <button
                className={styles.mapboxButton}
                disabled={true}
                type="button"
              >
                {constants.mapboxTokenHasSet}
              </button>
            ) : (
              <Link url="mapboxToken">
                <button className={styles.mapboxButton} type="button">
                  {constants.getMapboxToken}
                </button>
              </Link>
            )}
            <button
              className={styles.snappButton}
              data-access-token={accessToken}
              disabled={!accessToken}
              onClick={handleGetRidesHistory}
              type="button"
            >
              {constants.getAnalytics}
            </button>
          </>
        ) : (
          <>
            <span className={styles.hint}>
              {error ? error : constants.snappLoginHint}
            </span>
            <Link url="snappPWA">
              <button className={styles.snappButton} type="button">
                {constants.loginToSnapp}
              </button>
            </Link>
          </>
        )}
      </div>
      <Footer />
    </main>
  );
};

export default SnappExtension;
